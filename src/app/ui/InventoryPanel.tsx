"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { updateProfileDescription, updateProfileImage } from '@/app/actions/profileActions';
import { createProduct, deleteProduct, updateProduct } from '@/app/actions/productActions';

interface Artisan {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  imageUrl: string | null;
}

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  availability: string;
  description: string;
  imageUrl: string | null;
  artisanId: string;
  artisanName: string;
}

interface InventoryPanelProps {
  artisans: Artisan[];
  initialProducts: Product[];
  initialArtisanId?: string;
  showProfileSelector?: boolean;
}

const CATEGORIES = ['Woodwork', 'Jewelry', 'Pottery', 'Textiles', 'Ceramics', 'Leather Goods', 'Metalwork', 'Other'];
const AVAILABILITY_OPTIONS = ['In Stock', 'Custom Order'];

const emptyForm = {
  title: '',
  price: '',
  category: '',
  availability: 'In Stock',
  description: '',
  imageUrl: '',
};

function getDefaultProfileDescription(artisan?: Artisan) {
  const displayName = artisan?.name || 'Independent Artisan';
  return `${displayName} is part of the Handcrafted Haven maker community, sharing thoughtfully crafted pieces with shoppers who value personal, handmade work.`;
}

function getProfileDescriptionDraft(artisan?: Artisan) {
  return artisan?.bio?.trim() || getDefaultProfileDescription(artisan);
}

export default function InventoryPanel({
  artisans: initialArtisans,
  initialProducts,
  initialArtisanId = '',
  showProfileSelector = false,
}: InventoryPanelProps) {
  const defaultArtisanId = initialArtisanId || initialArtisans[0]?.id || '';
  const defaultArtisan = initialArtisans.find(a => a.id === defaultArtisanId);
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);
  const [selectedArtisanId, setSelectedArtisanId] = useState<string>(defaultArtisanId);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [bioDraft, setBioDraft] = useState(getProfileDescriptionDraft(defaultArtisan));
  const [imageUrlDraft, setImageUrlDraft] = useState(defaultArtisan?.imageUrl || '');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingBio, setIsSavingBio] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedArtisan = artisans.find(a => a.id === selectedArtisanId);
  const myProducts = products.filter(p => p.artisanId === selectedArtisanId);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectArtisan = (artisanId: string) => {
    const nextArtisan = artisans.find(a => a.id === artisanId);
    setSelectedArtisanId(artisanId);
    setBioDraft(getProfileDescriptionDraft(nextArtisan));
    setImageUrlDraft(nextArtisan?.imageUrl || '');
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSaveBio = async () => {
    if (!selectedArtisanId) {
      showMessage('error', 'Your artisan profile could not be found.');
      return;
    }
    setIsSavingBio(true);
    try {
      const data = await updateProfileDescription({
        description: bioDraft,
        artisanId: selectedArtisanId,
      });
      if (data.error) {
        showMessage('error', data.error || 'Could not update your profile description.');
        return;
      }
      const savedBio = data.profile?.bio || '';
      setBioDraft(savedBio || getDefaultProfileDescription(selectedArtisan));
      setArtisans(prev => prev.map(a => a.id === selectedArtisanId ? { ...a, bio: savedBio || null } : a));
      showMessage('success', 'Profile description updated successfully.');
    } catch {
      showMessage('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSavingBio(false);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedArtisanId) {
      showMessage('error', 'Your artisan profile could not be found.');
      return;
    }
    setIsSavingImage(true);
    try {
      const data = await updateProfileImage({
        imageUrl: imageUrlDraft,
        artisanId: selectedArtisanId,
      });
      if (data.error) {
        showMessage('error', data.error || 'Could not update your profile image.');
        return;
      }
      const savedImageUrl = data.profile?.imageUrl || '';
      setImageUrlDraft(savedImageUrl);
      setArtisans(prev => prev.map(a => a.id === selectedArtisanId ? { ...a, imageUrl: savedImageUrl || null } : a));
      showMessage('success', 'Profile image updated successfully.');
    } catch {
      showMessage('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category,
      availability: product.availability,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async () => {
    if (!selectedArtisanId) {
      showMessage('error', 'Please select an artisan first.');
      return;
    }
    if (!form.title || !form.price || !form.category) {
      showMessage('error', 'Please fill in the title, price, and category.');
      return;
    }
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      showMessage('error', 'Please enter a valid price.');
      return;
    }
    setIsSubmitting(true);
    try {
      const data = editingId
        ? await updateProduct(editingId, {
            title: form.title,
            price: Number(form.price),
            category: form.category,
            availability: form.availability,
            description: form.description,
            imageUrl: form.imageUrl,
          })
        : await createProduct({
            title: form.title,
            price: Number(form.price),
            category: form.category,
            availability: form.availability,
            description: form.description,
            imageUrl: form.imageUrl,
            artisanId: selectedArtisanId,
          });

      if (data.error || !data.product) {
        showMessage('error', data.error || 'Something went wrong. Please try again.');
        return;
      }

      if (editingId) {
        setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...data.product } : p));
        showMessage('success', 'Product updated successfully.');
        setEditingId(null);
      } else {
        setProducts(prev => [{ ...data.product, artisanName: selectedArtisan?.name || '' }, ...prev]);
        showMessage('success', 'Product added successfully.');
      }
      setForm(emptyForm);
    } catch {
      showMessage('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    setIsSubmitting(true);
    try {
      const result = await deleteProduct(productId);
      if (result.error) {
        showMessage('error', result.error || 'Could not delete the product. Please try again.');
        return;
      }
      setProducts(prev => prev.filter(p => p.id !== productId));
      setDeleteConfirmId(null);
      showMessage('success', 'Product deleted successfully.');
    } catch {
      showMessage('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Message Banner */}
      {message && (
        <div style={{
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`,
          color: message.type === 'success' ? '#166534' : '#991b1b',
          fontWeight: '500',
          fontSize: '0.95rem',
        }}>
          {message.text}
        </div>
      )}

      {showProfileSelector && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
            Select Your Profile
          </h2>
          <select
            value={selectedArtisanId}
            onChange={e => handleSelectArtisan(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '1rem',
              color: '#0f172a',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">Choose an artisan...</option>
            {artisans.map(artisan => (
              <option key={artisan.id} value={artisan.id}>
                {artisan.name} — {artisan.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedArtisanId && (
        <>
          {/* Profile Image Section */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.35rem 0' }}>
                Profile Image
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                This appears on your public artisan profile and the artisans page.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 80px', gap: '1rem', alignItems: 'center' }}>
              <input
                type="url"
                value={imageUrlDraft}
                onChange={e => setImageUrlDraft(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)',
              }}>
                {imageUrlDraft ? (
                  <Image
                    src={imageUrlDraft}
                    alt="Profile preview"
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ color: 'var(--color-background)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {selectedArtisan?.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveImage}
              disabled={isSavingImage}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                cursor: isSavingImage ? 'not-allowed' : 'pointer',
                opacity: isSavingImage ? 0.7 : 1,
                marginTop: '1rem',
              }}
            >
              {isSavingImage ? 'Saving Image...' : 'Save Profile Image'}
            </button>
          </div>

          {/* Profile Description Section */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.35rem 0' }}>
                Profile Description
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                This appears on your public artisan profile above your products.
              </p>
            </div>
            <textarea
              value={bioDraft}
              onChange={e => setBioDraft(e.target.value)}
              placeholder="Share your story, craft, materials, and what inspires your work..."
              rows={5}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.6,
              }}
            />
            <button
              type="button"
              onClick={handleSaveBio}
              disabled={isSavingBio}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                cursor: isSavingBio ? 'not-allowed' : 'pointer',
                opacity: isSavingBio ? 0.7 : 1,
                marginTop: '1rem',
              }}
            >
              {isSavingBio ? 'Saving Description...' : 'Save Description'}
            </button>
          </div>

          {/* Add / Edit Product Form */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Product Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleFormChange('title', e.target.value)}
                  placeholder="e.g. Handmade Wooden Chair"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => handleFormChange('price', e.target.value)}
                  placeholder="e.g. 15000"
                  min="0"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => handleFormChange('category', e.target.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', backgroundColor: '#ffffff' }}
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Availability</label>
                <select
                  value={form.availability}
                  onChange={e => handleFormChange('availability', e.target.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', backgroundColor: '#ffffff' }}
                >
                  {AVAILABILITY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Description</label>
              <textarea
                value={form.description}
                onChange={e => handleFormChange('description', e.target.value)}
                placeholder="Describe your product..."
                rows={3}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(180px, 240px)', gap: '1rem', alignItems: 'stretch', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Product Image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={e => handleFormChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/product-photo.jpg"
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{
                minHeight: '118px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                overflow: 'hidden',
                display: 'grid',
                placeItems: 'center',
                color: '#64748b',
                fontSize: '0.85rem',
                textAlign: 'center',
                position: 'relative',
              }}>
                {form.imageUrl ? (
                  <Image
                    src={form.imageUrl}
                    alt="Product preview"
                    fill
                    sizes="240px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ padding: '1rem' }}>Image preview</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Product List */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>
              Your Products ({myProducts.length})
            </h2>

            {myProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📦</div>
                <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
                  You have not added any products yet. Use the form above to get started.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myProducts.map(product => (
                  <div key={product.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    backgroundColor: editingId === product.id ? '#faf5ff' : '#ffffff',
                  }}>
                    <div style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '8px',
                      backgroundColor: '#f1f5f9',
                      overflow: 'hidden',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#94a3b8',
                      fontSize: '0.75rem',
                      flex: '0 0 76px',
                      position: 'relative',
                    }}>
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          sizes="76px"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <span>Image</span>
                      )}
                    </div>

                    <div style={{ flex: '1', minWidth: '200px' }}>
                      <h3 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontSize: '1rem', fontWeight: '600' }}>
                        {product.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {product.category}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          backgroundColor: product.availability === 'In Stock' ? '#f0fdf4' : '#fefce8',
                          color: product.availability === 'In Stock' ? '#166534' : '#854d0e',
                        }}>
                          {product.availability}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {deleteConfirmId === product.id ? (
                        <>
                          <span style={{ fontSize: '0.9rem', color: '#64748b', alignSelf: 'center' }}>Are you sure?</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            disabled={isSubmitting}
                            style={{
                              backgroundColor: '#ef4444',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Yes, Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              border: '1px solid #e2e8f0',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            style={{
                              backgroundColor: 'var(--color-accent)',
                              color: 'var(--color-primary)',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(product.id)}
                            style={{
                              backgroundColor: '#fef2f2',
                              color: '#ef4444',
                              border: '1px solid #fca5a5',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}