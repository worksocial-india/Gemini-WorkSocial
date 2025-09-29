import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Send, FileText, Eye, Edit3, Trash2, Calendar, User, Clock, Save, X, CheckCircle, AlertCircle, Upload, Download, LogOut, Shield } from 'lucide-react';

const BlogAdmin = () => {
  const { user, logout } = useAuth();
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [authorName, setAuthorName] = useState(user?.name || '');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('email');
  const [previewPost, setPreviewPost] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const categories = [
    'Home Loans', 'Investment', 'Insurance', 'Tax Planning', 
    'Personal Finance', 'Business Loans', 'Market Trends', 'Policy Updates'
  ];

  useEffect(() => {
    loadDrafts();
    loadPublishedPosts();
  }, []);

  const loadDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');
    setDrafts(savedDrafts);
  };

  const loadPublishedPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
    setPublishedPosts(savedPosts);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  };

  const processEmailToBlog = () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      showNotification('error', 'Please provide both subject and content');
      return;
    }

    setIsProcessing(true);

    // Simulate email processing
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title: emailSubject.trim(),
        content: emailContent.trim(),
        excerpt: emailContent.substring(0, 200) + '...',
        author: authorName || 'Admin',
        category: category || 'Personal Finance',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: featuredImage || '/dashboard-hero-desktop.jpg',
        date: new Date().toISOString().split('T')[0],
        readTime: Math.ceil(emailContent.split(' ').length / 200) + ' min',
        status: 'draft',
        createdAt: new Date().toLocaleString()
      };

      const updatedDrafts = [newPost, ...drafts];
      setDrafts(updatedDrafts);
      localStorage.setItem('blogDrafts', JSON.stringify(updatedDrafts));

      // Reset form
      setEmailContent('');
      setEmailSubject('');
      setAuthorName('');
      setCategory('');
      setTags('');
      setFeaturedImage('');
      
      setIsProcessing(false);
      showNotification('success', 'Blog post created from email successfully!');
      setActiveTab('drafts');
    }, 2000);
  };



  const publishPost = (post) => {
    const publishedPost = { ...post, status: 'published', publishedAt: new Date().toLocaleString() };
    
    // Add to published posts
    const updatedPublished = [publishedPost, ...publishedPosts];
    setPublishedPosts(updatedPublished);
    localStorage.setItem('publishedPosts', JSON.stringify(updatedPublished));
    
    // Remove from drafts
    const updatedDrafts = drafts.filter(draft => draft.id !== post.id);
    setDrafts(updatedDrafts);
    localStorage.setItem('blogDrafts', JSON.stringify(updatedDrafts));
    
    showNotification('success', 'Post published successfully!');
  };

  const deleteDraft = (postId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== postId);
    setDrafts(updatedDrafts);
    localStorage.setItem('blogDrafts', JSON.stringify(updatedDrafts));
    showNotification('success', 'Draft deleted successfully!');
  };

  const PostCard = ({ post, isDraft = false }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-IN')}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => setPreviewPost(post)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Preview"
          >
            <Eye size={16} />
          </button>
          {isDraft && (
            <>
              <button
                onClick={() => publishPost(post)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Publish"
              >
                <Send size={16} />
              </button>
              <button
                onClick={() => deleteDraft(post.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          post.category === 'Home Loans' ? 'bg-blue-100 text-blue-800' :
          post.category === 'Investment' ? 'bg-green-100 text-green-800' :
          post.category === 'Insurance' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {post.category}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isDraft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}>
          {post.status}
        </span>
      </div>
    </div>
  );

  const PreviewModal = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Preview Post</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="prose max-w-none">
            <div className="mb-6">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-IN')}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
            
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {post.content}
            </div>
            
            {post.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your blog posts and publish content via email</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-medium">Total Drafts: {drafts.length}</span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-green-800 font-medium">Published: {publishedPosts.length}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                <Shield className="text-gray-600" size={16} />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user?.name}</div>
                  <div className="text-gray-600">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-40 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('email')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'email'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Mail className="inline mr-2" size={16} />
                Email to Blog
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'drafts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="inline mr-2" size={16} />
                Drafts ({drafts.length})
              </button>
              <button
                onClick={() => setActiveTab('published')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'published'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Send className="inline mr-2" size={16} />
                Published ({publishedPosts.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Email to Blog Tab */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email to Blog Converter</h2>
              <p className="text-gray-600">
                Paste your email content below and convert it into a blog post. The system will automatically 
                format your content and create a draft for review.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject (Blog Title)
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter your email subject here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content (Blog Content)
                  </label>
                  <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Paste your email content here..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="Image URL (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={processEmailToBlog}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileText size={16} />
                      Create Blog Draft
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === 'drafts' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Draft Posts</h2>
              <p className="text-gray-600">Review and publish your draft blog posts</p>
            </div>
            {drafts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts available</h3>
                <p className="text-gray-600">Create your first blog post using the Email to Blog converter</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {drafts.map(post => (
                  <PostCard key={post.id} post={post} isDraft={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Published Tab */}
        {activeTab === 'published' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Published Posts</h2>
              <p className="text-gray-600">Your published blog posts</p>
            </div>
            {publishedPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Send size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No published posts</h3>
                <p className="text-gray-600">Publish your first blog post from the drafts section</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {publishedPosts.map(post => (
                  <PostCard key={post.id} post={post} isDraft={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewPost && (
        <PreviewModal 
          post={previewPost} 
          onClose={() => setPreviewPost(null)} 
        />
      )}
    </div>
  );
};

export default BlogAdmin;