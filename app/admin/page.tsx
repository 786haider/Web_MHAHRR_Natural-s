"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  User,
  Key,
  LogOut,
  Package,
  FileText,
  Image as ImageIcon,
  Shield,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  Copy,
  Check,
  Upload,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Leaf,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  inStock: boolean;
  tag?: string;
  image: string;
  accent?: string;
  description?: string;
  benefits?: string[];
}

interface Blog {
  id: string;
  slug: string;
  tag: string;
  hashtag: string;
  count?: string;
  title: string;
  subtitle?: string;
  category: string;
  readTime?: string;
  publishDate?: string;
  author?: string;
  authorRole?: string;
  coverImage: string;
  featured?: boolean;
  excerpt?: string;
  content?: {
    intro?: string;
    sections?: { heading: string; body: string; bullets?: string[] }[];
    herbalityPledge?: string;
  };
  keyTakeaways?: string[];
}

interface MediaFile {
  name: string;
  path: string;
  url: string;
  folder: string;
  size: number;
  updatedAt: string;
}

export default function AdminPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<{ username: string; name?: string; email?: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'products' | 'blogs' | 'images' | 'settings'>('products');

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Images state
  const [images, setImages] = useState<MediaFile[]>([]);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [imageFolderFilter, setImageFolderFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Security / Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingsMsg, setSettingsMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Check existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mhahrr_admin_token');
    const savedUser = localStorage.getItem('mhahrr_admin_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setAdminUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('mhahrr_admin_token');
        localStorage.removeItem('mhahrr_admin_user');
      }
    }
    setIsAuthLoading(false);
  }, []);

  // Fetch functions
  const fetchProducts = useCallback(async () => {
    setIsProductsLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    setIsBlogsLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    } finally {
      setIsBlogsLoading(false);
    }
  }, []);

  const fetchImages = useCallback(async () => {
    setIsImagesLoading(true);
    try {
      const res = await fetch('/api/admin/images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Failed to fetch images', err);
    } finally {
      setIsImagesLoading(false);
    }
  }, []);

  // Load dashboard data once authenticated
  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchBlogs();
      fetchImages();
    }
  }, [token, fetchProducts, fetchBlogs, fetchImages]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        setAdminUser(data.user);
        localStorage.setItem('mhahrr_admin_token', data.token);
        localStorage.setItem('mhahrr_admin_user', JSON.stringify(data.user));
        showToast(`Welcome back, ${data.user.name || 'Admin'}!`);
      } else {
        setLoginError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setLoginError('Network error. Failed to reach authentication server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('mhahrr_admin_token');
    localStorage.removeItem('mhahrr_admin_user');
    showToast('Logged out successfully.');
  };

  // Product CRUD
  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const isUpdating = Boolean(editingProduct.id && products.some((p) => String(p.id) === String(editingProduct.id)));
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (res.ok && data.product) {
        if (isUpdating) {
          setProducts((prev) => prev.map((p) => (String(p.id) === String(data.product.id) ? data.product : p)));
          showToast(`Product "${data.product.name}" updated!`);
        } else {
          setProducts((prev) => [data.product, ...prev]);
          showToast(`Product "${data.product.name}" created!`);
        }
        setIsProductModalOpen(false);
        setEditingProduct(null);
      } else {
        showToast(data.error || 'Failed to save product', 'error');
      }
    } catch {
      showToast('Network error while saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
        showToast(`Product "${name}" deleted successfully.`);
      } else {
        showToast('Failed to delete product', 'error');
      }
    } catch {
      showToast('Network error while deleting product', 'error');
    }
  };

  // Blog CRUD
  const handleSaveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBlog) return;

    const isUpdating = Boolean(editingBlog.id && blogs.some((b) => String(b.id) === String(editingBlog.id)));
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });

      const data = await res.json();
      if (res.ok && data.blog) {
        if (isUpdating) {
          setBlogs((prev) => prev.map((b) => (String(b.id) === String(data.blog.id) ? data.blog : b)));
          showToast(`Blog "${data.blog.title}" updated!`);
        } else {
          setBlogs((prev) => [data.blog, ...prev]);
          showToast(`Blog "${data.blog.title}" created!`);
        }
        setIsBlogModalOpen(false);
        setEditingBlog(null);
      } else {
        showToast(data.error || 'Failed to save blog article', 'error');
      }
    } catch {
      showToast('Network error while saving blog article', 'error');
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog article "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => String(b.id) !== String(id)));
        showToast(`Blog article "${title}" deleted.`);
      } else {
        showToast('Failed to delete blog article', 'error');
      }
    } catch {
      showToast('Network error while deleting blog article', 'error');
    }
  };

  // Image Upload & Delete
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'uploads');

    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Image "${data.name}" uploaded successfully!`);
        fetchImages();
      } else {
        showToast(data.error || 'Failed to upload image', 'error');
      }
    } catch {
      showToast('Network error during file upload', 'error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async (imagePath: string, imageName: string) => {
    if (!confirm(`Are you sure you want to delete image "${imageName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/images?path=${encodeURIComponent(imagePath)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.path !== imagePath));
        showToast(`Image "${imageName}" deleted.`);
      } else {
        showToast('Failed to delete image', 'error');
      }
    } catch {
      showToast('Network error while deleting image', 'error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2500);
    showToast(`Copied path: ${text}`);
  };

  // Security Update
  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMsg(null);

    if (newPassword && newPassword !== confirmPassword) {
      setSettingsMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsUpdatingSettings(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword: newPassword || undefined,
          newUsername: newUsername || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettingsMsg({ type: 'success', text: 'Credentials updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (data.user) {
          setAdminUser(data.user);
          localStorage.setItem('mhahrr_admin_user', JSON.stringify(data.user));
        }
        showToast('Security settings updated!');
      } else {
        setSettingsMsg({ type: 'error', text: data.error || 'Failed to update credentials.' });
      }
    } catch {
      setSettingsMsg({ type: 'error', text: 'Network error while updating credentials.' });
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !productSearch.trim() ||
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(productSearch.toLowerCase()));

      const matchCategory =
        productCategoryFilter === 'all' || p.category.toLowerCase() === productCategoryFilter.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, productSearch, productCategoryFilter]);

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch =
        !blogSearch.trim() ||
        b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.tag.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.category.toLowerCase().includes(blogSearch.toLowerCase());

      const matchCategory =
        blogCategoryFilter === 'all' || b.category.toLowerCase() === blogCategoryFilter.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [blogs, blogSearch, blogCategoryFilter]);

  // Filtered Images
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchSearch = !imageSearch.trim() || img.name.toLowerCase().includes(imageSearch.toLowerCase());
      const matchFolder = imageFolderFilter === 'all' || img.folder === imageFolderFilter;
      return matchSearch && matchFolder;
    });
  }, [images, imageSearch, imageFolderFilter]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  // ─── LOGIN SCREEN (Shown if not logged in) ───────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-emerald-950 to-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-emerald-500/20 relative overflow-hidden">
          {/* Subtle glow decoration */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 border-2 border-emerald-500/40 p-2 shadow-lg flex items-center justify-center mb-4">
              <Image
                src="/logo/logo_without_text_bgremove.png"
                alt="MHAHRR Natural Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access Only</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              MHAHRR Natural
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage products, blogs &amp; website media
            </p>
          </div>

          {/* Error notice */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-11 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Enter Admin Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Credentials Hint for owner */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 border border-emerald-100">
              <span className="font-bold">Default Credentials:</span> Username: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded">admin</code> | Password: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded">admin123</code>
            </div>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-700 font-semibold transition-colors"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD (When Authenticated) ────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-100/70 text-gray-900 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold flex items-center gap-2 animate-bounce ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-700'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-emerald-950 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo/logo_without_text_bgremove.png"
                alt="MHAHRR Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight">MHAHRR Natural</span>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80">Content &amp; Media Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all border border-emerald-400/20"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-200 hover:text-white bg-red-950/60 hover:bg-red-900 px-3.5 py-2 rounded-xl transition-all border border-red-800/40"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-emerald-900/60 border-t border-emerald-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                activeTab === 'products'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                activeTab === 'blogs'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blogs &amp; Herbality ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                activeTab === 'images'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media &amp; Images ({images.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security &amp; Credentials</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ─── TAB 1: PRODUCTS MANAGER ───────────────────────────────────────── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Products Catalog</h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage all products shown on the website store and home collections.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: '',
                    name: '',
                    subtitle: '',
                    category: 'Face Care',
                    price: 14.99,
                    inStock: true,
                    tag: 'New',
                    image: '/product_img/oilImg2.png',
                    accent: '#6BAE75',
                    description: '',
                    benefits: ['100% Pure Botanical', 'Cruelty Free'],
                  });
                  setIsProductModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name, tag, category..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories ({products.length})</option>
                <option value="Face Care">Face Care</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Skincare Essentials">Skincare Essentials</option>
                <option value="Wellness Range">Wellness Range</option>
                <option value="Herbal Remedies">Herbal Remedies</option>
              </select>
            </div>

            {/* Products Table / Grid */}
            {isProductsLoading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading products catalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No products found</h3>
                <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Header Card */}
                      <div className="flex gap-4 mb-3">
                        <div className="relative w-20 h-20 rounded-xl bg-emerald-50/70 border border-emerald-100 overflow-hidden flex-shrink-0">
                          <Image
                            src={p.image || '/product_img/oilImg2.png'}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                              {p.category}
                            </span>
                            {p.tag && (
                              <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                                {p.tag}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 text-base leading-snug truncate" title={p.name}>
                            {p.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">{p.subtitle || 'Herbal formulation'}</p>
                          <p className="text-sm font-extrabold text-emerald-700 mt-1">
                            ${Number(p.price).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {p.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 bg-stone-50 p-2 rounded-lg">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full ${
                          p.inStock
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct({ ...p });
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                          title="Edit product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: BLOGS MANAGER ──────────────────────────────────────────── */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Herbality Blog Chronicles</h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Add, edit, or remove articles covering botanical wisdom and community hashtags.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog({
                    id: '',
                    slug: '',
                    tag: 'HerbalWisdom',
                    hashtag: '#HerbalWisdom',
                    count: 'New',
                    title: '',
                    subtitle: '',
                    category: 'Botanical Skincare',
                    readTime: '5 min read',
                    publishDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    author: 'MHAHRR Natural Botanical Team',
                    authorRole: 'Herbal Specialist',
                    coverImage: '/displaying_images/homepage_herbality_image.png',
                    featured: false,
                    excerpt: '',
                    content: {
                      intro: '',
                      sections: [
                        {
                          heading: '1. The Herbality Principle',
                          body: 'Formulated with organic botanicals to nurture holistic vitality.',
                        },
                      ],
                      herbalityPledge: 'Care crafted with compassion. What nature perfected, we simply bottle.',
                    },
                    keyTakeaways: ['100% pure botanical formulation'],
                  });
                  setIsBlogModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Blog Post</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles by title, hashtag, category..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={blogCategoryFilter}
                onChange={(e) => setBlogCategoryFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Blog Categories ({blogs.length})</option>
                <option value="Brand Heritage & Herbality">Heritage &amp; Herbality</option>
                <option value="Botanical Skincare">Botanical Skincare</option>
                <option value="Hair & Scalp Therapy">Hair &amp; Scalp Therapy</option>
                <option value="Traditional Remedies">Traditional Remedies</option>
                <option value="Clean Formulation">Clean Formulation</option>
                <option value="Apothecary Wisdom">Apothecary Wisdom</option>
              </select>
            </div>

            {/* Blogs Grid */}
            {isBlogsLoading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading blog articles...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No blog articles found</h3>
                <p className="text-xs text-gray-500 mt-1">Try another search keyword or clear filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-emerald-950 overflow-hidden">
                        <Image
                          src={b.coverImage || '/displaying_images/homepage_herbality_image.png'}
                          alt={b.title}
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-emerald-300 text-xs font-mono font-bold px-2.5 py-1 rounded-md">
                          {b.hashtag || `#${b.tag}`}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 font-medium">
                          <span>{b.publishDate}</span>
                          <span>•</span>
                          <span>{b.readTime || '5 min read'}</span>
                        </div>

                        <h4 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-1.5">
                          {b.title}
                        </h4>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {b.excerpt || b.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/blog?tag=${b.tag}`}
                        target="_blank"
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>View Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingBlog({ ...b });
                            setIsBlogModalOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                          title="Edit article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.id, b.title)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3: MEDIA & IMAGES MANAGER ─────────────────────────────────── */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Media &amp; Image Assets</h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Upload images, copy relative paths, or delete assets directly from the website storage.
                </p>
              </div>

              <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Uploading Image...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload New Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={handleUploadImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={imageSearch}
                  onChange={(e) => setImageSearch(e.target.value)}
                  placeholder="Search images by filename..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={imageFolderFilter}
                onChange={(e) => setImageFolderFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Folders ({images.length})</option>
                <option value="uploads">Uploads folder</option>
                <option value="product_img">Product Images folder</option>
                <option value="displaying_images">Displaying Images folder</option>
                <option value="logo">Logo folder</option>
              </select>
            </div>

            {/* Images Gallery */}
            {isImagesLoading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading media library...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No images found</h3>
                <p className="text-xs text-gray-500 mt-1">Upload a new image or clear your search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredImages.map((img) => (
                  <div
                    key={img.path}
                    className="bg-white rounded-2xl border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="relative aspect-square w-full rounded-xl bg-stone-100 overflow-hidden mb-2">
                      <Image
                        src={img.url}
                        alt={img.name}
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                        {img.folder}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-900 truncate" title={img.name}>
                        {img.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{(img.size / 1024).toFixed(1)} KB</p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => copyToClipboard(img.path)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                        title="Copy path for products or blogs"
                      >
                        {copiedPath === img.path ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPath === img.path ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteImage(img.path, img.name)}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Delete image file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 4: SECURITY & CREDENTIALS ─────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Admin Security Settings</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Change your admin login credentials and access credentials.
                  </p>
                </div>
              </div>

              {settingsMsg && (
                <div
                  className={`mb-6 p-4 rounded-2xl text-sm flex items-center gap-2 ${
                    settingsMsg.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {settingsMsg.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{settingsMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateSecurity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password to authorize changes"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      New Username (Optional)
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder={adminUser?.username || 'admin'}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {newPassword && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isUpdatingSettings}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isUpdatingSettings ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Security Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Stats Summary */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm grid grid-cols-3 text-center">
              <div>
                <p className="text-2xl font-black text-emerald-800">{products.length}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase mt-0.5">Total Products</p>
              </div>
              <div className="border-x border-gray-100">
                <p className="text-2xl font-black text-emerald-800">{blogs.length}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase mt-0.5">Herbality Blogs</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-800">{images.length}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase mt-0.5">Media Assets</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── ADD / EDIT PRODUCT MODAL ─────────────────────────────────────────── */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
              <h3 className="font-bold text-lg text-gray-900">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. Pure Herbal Miracle Oil"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={editingProduct.subtitle || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                    placeholder="e.g. Deep Scalp & Skin Nourishment"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Face Care">Face Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Skincare Essentials">Skincare Essentials</option>
                    <option value="Wellness Range">Wellness Range</option>
                    <option value="Herbal Remedies">Herbal Remedies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingProduct.tag || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                    placeholder="e.g. Best Seller"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image URL / Path *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="/product_img/oilImg2.png or /uploads/..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Tip: Copy path from the &ldquo;Media &amp; Images&rdquo; tab or upload new images there!
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Detailed botanical ingredients and benefits..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Key Benefits (Comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editingProduct.benefits) ? editingProduct.benefits.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      benefits: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Deep nourishment, Restores shine, 100% Pure"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="inStockCheck" className="text-sm font-semibold text-gray-700">
                  Mark product as &ldquo;In Stock&rdquo; (available for purchase)
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT BLOG MODAL ────────────────────────────────────────────── */}
      {isBlogModalOpen && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
              <h3 className="font-bold text-lg text-gray-900">
                {editingBlog.id ? 'Edit Herbality Blog Article' : 'Write New Blog Article'}
              </h3>
              <button
                onClick={() => {
                  setIsBlogModalOpen(false);
                  setEditingBlog(null);
                }}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  placeholder="e.g. The Science of Herbality in Skincare"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingBlog.subtitle || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, subtitle: e.target.value })}
                  placeholder="e.g. Why natural botanical actives outperform synthetics"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    placeholder="e.g. Botanical Skincare"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hashtag / Tag *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.tag}
                    onChange={(e) => {
                      const tagClean = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                      setEditingBlog({
                        ...editingBlog,
                        tag: tagClean,
                        hashtag: `#${tagClean}`,
                      });
                    }}
                    placeholder="e.g. HerbalSkincare"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime || '5 min read'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image Path / URL *</label>
                <input
                  type="text"
                  required
                  value={editingBlog.coverImage}
                  onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                  placeholder="/displaying_images/homepage_herbality_image.png or /uploads/..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Excerpt / Introduction *</label>
                <textarea
                  rows={3}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  placeholder="A compelling overview of the article..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Body Content</label>
                <textarea
                  rows={6}
                  value={editingBlog.content?.sections?.[0]?.body || ''}
                  onChange={(e) => {
                    const text = e.target.value;
                    setEditingBlog({
                      ...editingBlog,
                      content: {
                        intro: editingBlog.excerpt || '',
                        sections: [
                          {
                            heading: editingBlog.content?.sections?.[0]?.heading || '1. Botanical Wisdom',
                            body: text,
                          },
                        ],
                        herbalityPledge: editingBlog.content?.herbalityPledge || 'Care crafted with compassion.',
                      },
                    });
                  }}
                  placeholder="Main body content explaining the herbality principles..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md"
                >
                  Save Blog Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

