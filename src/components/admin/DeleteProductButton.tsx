"use client";

import React, { useState } from "react";
import { FiTrash2, FiLoader } from "react-icons/fi";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { toSlug } from "@/utils/slugify";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
  slug: string;
  category: string;
  subcategory: string;
}

export function DeleteProductButton({ 
  productId, 
  productName,
  slug, 
  category, 
  subcategory 
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${productName}"? This will also remove all its images from storage.`);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      // 1. Determine the storage folder path
      // Note: This must match the logic in CreateProductPage
      const catSlug = toSlug(category);
      const subCatSlug = toSlug(subcategory);
      const folderPath = `${catSlug}/${subCatSlug}/${slug}`;

      // 2. List all files in the product's folder
      const { data: files, error: listError } = await supabase.storage
        .from("product-images")
        .list(folderPath);

      if (listError) {
        console.error("Error listing files for deletion:", listError);
      } else if (files && files.length > 0) {
        // 3. Delete all files in the folder
        const filesToDelete = files.map((file) => `${folderPath}/${file.name}`);
        const { error: deleteStorageError } = await supabase.storage
          .from("product-images")
          .remove(filesToDelete);

        if (deleteStorageError) {
          console.error("Error deleting images from storage:", deleteStorageError);
        }
      }

      // 4. Delete the product row from the database
      const { error: deleteDbError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (deleteDbError) throw deleteDbError;

      // 5. Refresh the page to show updated list
      router.refresh();
      
    } catch (error: any) {
      alert(`Failed to delete product: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
        isDeleting ? "text-gray-400 cursor-not-allowed" : "text-gray-400 hover:text-red-500"
      }`}
      title="Delete Product"
    >
      {isDeleting ? (
        <FiLoader className="animate-spin" size={16} />
      ) : (
        <FiTrash2 size={16} />
      )}
      <span className="sr-only">Delete</span>
    </button>
  );
}
