
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import SectionTitle from '../components/SectionTitle';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="pt-32 pb-24 bg-white animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-red-600 font-bold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} /> Back to Knowledge Base
          </button>
          
          <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4 inline-block">
                {selectedPost.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{selectedPost.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-8 mb-12 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <User size={16} className="text-red-600" />
              {selectedPost.author}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <Calendar size={16} className="text-red-600" />
              {selectedPost.date}
            </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10 italic border-l-4 border-red-600 pl-6">
              {selectedPost.excerpt}
            </p>
            <div className="text-slate-700 leading-loose space-y-6">
              {selectedPost.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionTitle 
            title="Technical Knowledge Base" 
            subtitle="Explore our engineering team's latest research on medical textiles and sterilization standards."
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-slate-900 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-red-600" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-red-600" />
                    {post.author}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 mb-8 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="mt-auto flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
                >
                  Read Technical Paper
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
