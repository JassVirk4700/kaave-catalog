"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUploadCloud, FiX, FiPlus, FiCheck, FiLoader } from "react-icons/fi";
import { createBrowserClient } from "@supabase/ssr";
import { toSlug } from "@/utils/slugify";

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const BUCKET = "product-images";

const CATEGORIES: Record<string, { label: string; slug: string; subcategories: { label: string; slug: string }[] }> = {
  "Ladies Wear": {
    label: "Ladies Wear",
    slug: "ladies-wear",
    subcategories: [
      { label: "Flat Mules", slug: "flat-mules" },
      { label: "Heel", slug: "heel" },
      { label: "Boot", slug: "boot" },
      { label: "Plain Belly", slug: "plain-belly" },
      { label: "Flat Slippers", slug: "flat-slippers" },
      { label: "Lahori", slug: "lahori" },
      { label: "Punjabi", slug: "punjabi" },
    ],
  },
  "Mens Wear": {
    label: "Mens Wear",
    slug: "mens-wear",
    subcategories: [
      { label: "Sandal", slug: "sandal" },
      { label: "Slipper", slug: "slipper" },
      { label: "Loafer", slug: "loafer" },
      { label: "Dress Shoes", slug: "dress-shoes" },
    ],
  },
};

const TAG_OPTIONS = ["New", "Bestseller", "Limited", "Exclusive", "Sale"];

// ─── Image Preview ────────────────────────────────────────────────────────────

interface UploadedImage {
  file: File;
  preview: string;
  publicUrl?: string;
  uploading?: boolean;
  error?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateProductPage() {
  const router = useRouter();
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [workType, setWorkType] = useState("");
  const [tag, setTag] = useState("");
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number | "">("");
  const [specs, setSpecs] = useState<string[]>([""]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slug = toSlug(name);
  const categoryConfig = category ? CATEGORIES[category] : null;
  const subcategoryConfig = categoryConfig?.subcategories.find((s) => s.label === subcategory);

  // ─── Spec Handlers ────────────────────────────────────────────────────────

  const updateSpec = (i: number, val: string) =>
    setSpecs((prev) => prev.map((s, idx) => (idx === i ? val : s)));

  const addSpec = () => setSpecs((prev) => [...prev, ""]);

  const removeSpec = (i: number) =>
    setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  // ─── Image Selection ──────────────────────────────────────────────────────

  const handleFilePick = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      
      const newFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
      
      // Validation: Max 10 images total
      if (images.length + newFiles.length > 10) {
        setSubmitError("Maximum 10 images allowed per product.");
        return;
      }

      // Validation: Max 5MB per image
      const overSized = newFiles.find(f => f.size > 5 * 1024 * 1024);
      if (overSized) {
        setSubmitError(`Image "${overSized.name}" exceeds 5MB limit.`);
        return;
      }

      const newImages: UploadedImage[] = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    },
    [images]
  );

  const removeImage = (i: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  // ─── Upload Images to Bucket ──────────────────────────────────────────────

  const uploadImages = async (): Promise<string[]> => {
    if (!categoryConfig || !subcategoryConfig || !slug) return [];

    const folderPath = `${categoryConfig.slug}/${subcategoryConfig.slug}/${slug}`;
    const urls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const ext = img.file.name.split(".").pop() ?? "webp";
      const filePath = `${folderPath}/${i + 1}.${ext}`;

      setImages((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, uploading: true } : item))
      );

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, img.file, { upsert: true });

      if (error) {
        setImages((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, uploading: false, error: error.message } : item
          )
        );
        throw new Error(`Image upload failed: ${error.message}`);
      }

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      setImages((prev) =>
        prev.map((item, idx) =>
          idx === i
            ? { ...item, uploading: false, publicUrl: urlData.publicUrl }
            : item
        )
      );

      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !subcategory) {
      setSubmitError("Name, category, and subcategory are required.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const imageUrls = await uploadImages();

      const { error } = await supabase.from("products").insert({
        name: name.trim(),
        slug,
        category,
        subcategory,
        short_description: shortDesc || null,
        description: description || null,
        material: material || null,
        work_type: workType || null,
        tag: tag || null,
        featured,
        display_order: displayOrder !== "" ? Number(displayOrder) : 0,
        specs: specs.filter(Boolean).length > 0 ? specs.filter(Boolean) : null,
        image_urls: imageUrls.length > 0 ? imageUrls : null,
      });

      if (error) throw new Error(error.message);

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 border-b border-[#eae6df] pb-6">
          <h1 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">Create Product</h1>
          <p className="text-gray-500 mt-1 text-sm font-light">
            Fill in the details below to add a new product to the Supabase catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ─── SECTION: Basic Info ─────────────────────────────────────────── */}
          <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name — full width */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Golden Gilded Flat Mules"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
                {slug && (
                  <p className="text-xs text-gray-400 mt-1.5 font-mono">
                    Slug: <span className="text-[#873d3d] font-semibold">{slug}</span>
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Category *</label>
                <select
                  required
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setSubcategory(""); }}
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm appearance-none"
                >
                  <option value="">Select category…</option>
                  {Object.keys(CATEGORIES).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Subcategory *</label>
                <select
                  required
                  value={subcategory}
                  disabled={!category}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm appearance-none disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Select subcategory…</option>
                  {categoryConfig?.subcategories.map((s) => (
                    <option key={s.slug} value={s.label}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm appearance-none"
                >
                  <option value="">No tag</option>
                  {TAG_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Display Order</label>
                <input
                  type="number"
                  min={0}
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 1"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
              </div>

              {/* Featured */}
              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${featured ? "bg-[#873d3d]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : "translate-x-0"}`} />
                </button>
                <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
              </div>
            </div>
          </section>

          {/* ─── SECTION: Descriptions ───────────────────────────────────────── */}
          <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Descriptions</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Short Description</label>
                <input
                  type="text"
                  value={shortDesc}
                  maxLength={100}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="One-line summary shown on product cards"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1 text-right">{shortDesc.length}/100 characters</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Full Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed product description for the detail page…"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm resize-none"
                />
              </div>
            </div>
          </section>

          {/* ─── SECTION: Material Details ───────────────────────────────────── */}
          <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Material & Craftsmanship</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Soft Leather Patava"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Work Type</label>
                <input
                  type="text"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  placeholder="e.g. Pearl Embroidery"
                  className="w-full px-4 py-3 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
              </div>
            </div>
          </section>

          {/* ─── SECTION: Specifications ──────────────────────────────────────── */}
          <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Specifications</h2>

            <div className="space-y-2.5">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-[#873d3d] font-bold text-lg leading-none mt-0.5">•</span>
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => updateSpec(i, e.target.value)}
                    placeholder={`Spec ${i + 1} — e.g. Sole: TRP`}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                  />
                  {specs.length > 1 && (
                    <button type="button" onClick={() => removeSpec(i)} className="p-1.5 text-gray-400 hover:text-red-500 transition">
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1.5 text-xs font-bold text-[#873d3d] hover:text-[#722f2f] mt-2 transition"
              >
                <FiPlus size={14} /> Add Specification
              </button>
            </div>
          </section>

          {/* ─── SECTION: Images ──────────────────────────────────────────────── */}
          <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Product Images</h2>

            {/* Bucket Path Preview */}
            {category && subcategory && name && (
              <div className="mb-4 flex items-center gap-2 bg-[#fcfaf7] border border-[#eae6df] px-3 py-2 rounded-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Upload path:</span>
                <code className="text-[11px] text-[#873d3d] font-mono font-semibold">
                  {BUCKET}/{categoryConfig?.slug}/{subcategoryConfig?.slug}/{slug}/
                </code>
              </div>
            )}

            {/* Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFilePick(e.dataTransfer.files); }}
              className="border-2 border-dashed border-[#d4b8a8] rounded-xl p-8 text-center cursor-pointer hover:bg-[#f5f3f0] hover:border-[#873d3d] transition-all group"
            >
              <FiUploadCloud size={28} className="mx-auto text-gray-300 group-hover:text-[#873d3d] mb-3 transition-colors" />
              <p className="text-sm font-medium text-gray-500">Drag & drop images or <span className="text-[#873d3d] font-bold">click to browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP supported</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFilePick(e.target.files)}
              />
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[#eae6df] bg-[#f5f3f0]">
                    <Image
                      src={img.preview}
                      alt={`Preview ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                    {img.uploading && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <FiLoader size={16} className="animate-spin text-[#873d3d]" />
                      </div>
                    )}
                    {img.publicUrl && !img.uploading && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <FiCheck size={16} className="text-green-700" />
                      </div>
                    )}
                    {img.error && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <FiX size={14} className="text-red-700" />
                      </div>
                    )}
                    {!img.uploading && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                      >
                        <FiX size={12} className="text-gray-700" />
                      </button>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] text-center py-0.5 font-bold">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ─── Error ────────────────────────────────────────────────────────── */}
          {submitError && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3">
              <FiX size={18} className="shrink-0" />
              {submitError}
            </div>
          )}

          {/* ─── Submit ───────────────────────────────────────────────────────── */}
          <div className="flex gap-3 pt-2 pb-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 md:flex-none px-6 py-3.5 border border-[#eae6df] text-gray-600 font-medium rounded-xl hover:bg-[#f5f3f0] transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || success}
              className={`flex-1 py-3.5 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center gap-2 transition-all shadow-md
                ${success
                  ? "bg-green-600 text-white"
                  : "bg-[#873d3d] hover:bg-[#722f2f] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                }`}
            >
              {submitting ? (
                <><FiLoader className="animate-spin" size={16} /> Uploading & Creating…</>
              ) : success ? (
                <><FiCheck size={16} /> Product Created! Redirecting…</>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
