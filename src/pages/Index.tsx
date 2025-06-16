
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Book, Grid2x2, Search, Sparkles, ArrowLeft, ExternalLink, Star } from "lucide-react";
import { edutechData } from "@/data/edutechData";

interface EdutechItem {
  에듀테크명: string;
  운영현황: string;
  주요변경사항및핵심특징: string;
  공식웹사이트: string;
  가격정책: string;
  주요대상: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showAll, setShowAll] = useState(false);

  const categories = Object.keys(edutechData);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setShowAll(false);
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const handleBackToCategories = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setShowAll(false);
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory('');
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedCategory('');
    setSelectedSubCategory('');
  };

  const getAllEdutechItems = () => {
    const allItems: (EdutechItem & { 대분류: string; 중분류: string; 소분류: string })[] = [];
    Object.entries(edutechData).forEach(([category, subCategories]) => {
      Object.entries(subCategories as Record<string, any>).forEach(([subCategory, items]) => {
        Object.entries(items as Record<string, any>).forEach(([itemCategory, itemList]) => {
          (itemList as EdutechItem[]).forEach(item => {
            allItems.push({
              ...item,
              대분류: category,
              중분류: subCategory,
              소분류: itemCategory
            });
          });
        });
      });
    });
    return allItems;
  };

  const getWebsiteThumbnail = (url: string) => {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case '무료': return 'from-emerald-400 to-emerald-600 text-white shadow-emerald-200';
      case '부분 유료': return 'from-amber-400 to-orange-500 text-white shadow-amber-200';
      case '유료': case '유료(구독)': case '유료(B2B/B2G)': return 'from-rose-400 to-pink-600 text-white shadow-rose-200';
      case '하드웨어 유료': return 'from-purple-400 to-purple-600 text-white shadow-purple-200';
      case '기업용(B2B)': return 'from-blue-400 to-indigo-600 text-white shadow-blue-200';
      default: return 'from-gray-400 to-gray-600 text-white shadow-gray-200';
    }
  };

  const getTargetColor = (target: string) => {
    if (target.includes('초')) return 'from-orange-400 to-red-500 text-white';
    if (target.includes('중')) return 'from-blue-400 to-indigo-500 text-white';
    if (target.includes('고')) return 'from-purple-400 to-violet-500 text-white';
    if (target.includes('대학')) return 'from-indigo-400 to-purple-500 text-white';
    if (target.includes('교원')) return 'from-emerald-400 to-teal-500 text-white';
    return 'from-gray-400 to-gray-500 text-white';
  };

  if (showAll) {
    const allItems = getAllEdutechItems();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-12">
            <Button
              onClick={handleBackToCategories}
              className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-500 rounded-2xl px-6 py-3 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
            <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 tracking-tight">
              2025년 에듀테크 컬렉션
            </h1>
            <p className="text-xl text-white/80 mb-8 font-medium">
              총 <span className="text-cyan-400 font-bold text-2xl">{allItems.length}</span>개의 혁신적인 교육 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItems.map((item, index) => (
              <Card key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-105 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <img
                        src={getWebsiteThumbnail(item.공식웹사이트)}
                        alt={item.에듀테크명}
                        className="w-12 h-12 rounded-2xl shadow-lg border border-white/20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-white font-bold leading-tight">{item.에듀테크명}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge className="text-xs px-2 py-1 bg-white/10 text-white/80 border border-white/20 rounded-full">{item.대분류}</Badge>
                        <Badge className="text-xs px-2 py-1 bg-white/10 text-white/80 border border-white/20 rounded-full">{item.중분류}</Badge>
                        <Badge className="text-xs px-2 py-1 bg-white/10 text-white/80 border border-white/20 rounded-full">{item.소분류}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`text-xs px-3 py-1.5 bg-gradient-to-r ${getPriceColor(item.가격정책)} rounded-full font-medium shadow-lg`}>
                      {item.가격정책}
                    </Badge>
                    <Badge className={`text-xs px-3 py-1.5 bg-gradient-to-r ${getTargetColor(item.주요대상)} rounded-full font-medium shadow-lg`}>
                      {item.주요대상}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-sm text-white/70 mb-4 line-clamp-3 leading-relaxed">
                    {item.주요변경사항및핵심특징}
                  </CardDescription>
                  <Button
                    onClick={() => window.open(item.공식웹사이트, '_blank')}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 group"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    웹사이트 방문
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory && selectedSubCategory) {
    const items = (edutechData as any)[selectedCategory]?.[selectedSubCategory];
    if (!items) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-3xl animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-full blur-3xl animate-ping delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-10">
            <div className="flex gap-3 justify-center mb-6">
              <Button
                onClick={handleBackToCategories}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-500 rounded-2xl px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Home className="w-4 h-4 mr-2" />
                홈
              </Button>
              <Button
                onClick={handleBackToSubCategories}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-500 rounded-2xl px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {selectedCategory}
              </Button>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-4 tracking-tight">
              {selectedCategory} → {selectedSubCategory}
            </h1>
            <p className="text-white/80 text-lg font-medium">프리미엄 에듀테크 솔루션 컬렉션</p>
          </div>

          <div className="space-y-8">
            {Object.entries(items as Record<string, EdutechItem[]>).map(([itemCategory, itemList]) => (
              <div key={itemCategory} className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Grid2x2 className="w-4 h-4 text-white" />
                  </div>
                  {itemCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemList.map((item: EdutechItem, index: number) => (
                    <Card key={index} className="group bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={getWebsiteThumbnail(item.공식웹사이트)}
                            alt={item.에듀테크명}
                            className="w-10 h-10 rounded-xl shadow-md border border-white/20"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                            }}
                          />
                          <CardTitle className="text-lg text-white font-bold">{item.에듀테크명}</CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={`text-xs px-3 py-1 bg-gradient-to-r ${getPriceColor(item.가격정책)} rounded-full font-medium shadow-md`}>
                            {item.가격정책}
                          </Badge>
                          <Badge className={`text-xs px-3 py-1 bg-gradient-to-r ${getTargetColor(item.주요대상)} rounded-full font-medium shadow-md`}>
                            {item.주요대상}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-white/70 mb-4 leading-relaxed">
                          {item.주요변경사항및핵심특징}
                        </CardDescription>
                        <Button
                          onClick={() => window.open(item.공식웹사이트, '_blank')}
                          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/25 hover:scale-105 group"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          방문하기
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const subCategories = Object.keys((edutechData as any)[selectedCategory] || {});
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-12">
            <Button
              onClick={handleBackToCategories}
              className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-500 rounded-2xl px-6 py-3 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              대분류로 돌아가기
            </Button>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent mb-4 tracking-tight">
              {selectedCategory}
            </h1>
            <p className="text-white/80 text-lg font-medium">세부 카테고리를 선택해주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subCategories.map((subCategory, index) => (
              <Card
                key={subCategory}
                className="group cursor-pointer bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-105 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/25"
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center py-12 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                    <Book className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white font-bold group-hover:text-blue-100 transition-colors duration-300 mb-4">
                    {subCategory}
                  </CardTitle>
                  <ChevronRight className="w-6 h-6 mx-auto text-white/60 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400/60 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-yellow-400/60 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-400/60 rounded-full animate-bounce delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            2025년 최신 에듀테크 트렌드
          </div>
          
          <h1 className="text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
            에듀테크
            <br />
            <span className="text-6xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">이노베이션 허브</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            교육의 미래를 선도하는 혁신적인 기술들을 탐험하고, 
            <br />당신의 교육 환경을 한 단계 끌어올려 보세요
          </p>
          
          <div className="flex gap-6 justify-center mb-12">
            <Button
              onClick={handleShowAll}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 group text-lg"
            >
              <Search className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              전체 컬렉션 탐색
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category}
              className="group cursor-pointer bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-110 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2"
              onClick={() => handleCategorySelect(category)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="text-center py-12 relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <Grid2x2 className="w-12 h-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-xl text-white font-bold group-hover:text-cyan-100 transition-colors duration-300 mb-4">
                  {category}
                </CardTitle>
                
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300" />
                </div>
                
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto"></div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white/60 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            최종 검증일: 2025년 6월 | 교육 전문가를 위한 프리미엄 가이드
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23a78bfa" opacity="0.4"/><circle cx="10" cy="10" r="3" fill="%23a78bfa"/></svg>'), auto;
        }

        .cursor-pointer {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%2306b6d4" opacity="0.5"/><circle cx="10" cy="10" r="4" fill="%2306b6d4"/></svg>'), pointer;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default Index;
