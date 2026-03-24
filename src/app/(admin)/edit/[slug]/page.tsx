import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import EditProductForm from '@/components/admin/EditProductForm';

interface EditPageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();

    // 1. Secure the route
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    // 2. Fetch the product data
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !product) {
        notFound();
    }

    return <EditProductForm initialData={product} />;
}
