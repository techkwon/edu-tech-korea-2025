
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
    try {
      if (!url || url.trim() === '' || url === '해당 없음') {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23007AFF' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
      }
      
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
      console.warn('Invalid URL:', url);
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23007AFF' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case '무료': return 'bg-green-50 text-green-800 border-green-200';
      case '부분 유료': return 'bg-orange-50 text-orange-800 border-orange-200';
      case '유료': case '유료(구독)': case '유료(B2B/B2G)': return 'bg-blue-50 text-blue-800 border-blue-200';
      case '하드웨어 유료': return 'bg-purple-50 text-purple-800 border-purple-200';
      case '기업용(B2B)': return 'bg-gray-50 text-gray-800 border-gray-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getTargetColor = (target: string) => {
    if (target.includes('초')) return 'bg-red-50 text-red-800 border-red-200';
    if (target.includes('중')) return 'bg-blue-50 text-blue-800 border-blue-200';
    if (target.includes('고')) return 'bg-purple-50 text-purple-800 border-purple-200';
    if (target.includes('대학')) return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    if (target.includes('교원')) return 'bg-green-50 text-green-800 border-green-200';
    return 'bg-gray-50 text-gray-800 border-gray-200';
  };

  if (showAll) {
    const allItems = getAllEdutechItems();
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <Button
              onClick={handleBackToCategories}
              variant="ghost"
              className="mb-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-6 py-3 transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              에듀테크 컬렉션
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
              총 <span className="text-blue-600 font-bold">{allItems.length}</span>개의 혁신적인 교육 솔루션을 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItems.map((item, index) => (
              <Card key={index} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={getWebsiteThumbnail(item.공식웹사이트)}
                        alt={item.에듀테크명}
                        className="w-12 h-12 rounded-2xl shadow-sm border border-gray-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23007AFF' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 font-bold leading-tight line-clamp-2">{item.에듀테크명}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0 rounded-full font-medium">{item.대분류}</Badge>
                        <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0 rounded-full font-medium">{item.중분류}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`text-xs px-3 py-1.5 border rounded-full font-medium ${getPriceColor(item.가격정책)}`}>
                      {item.가격정책}
                    </Badge>
                    <Badge className={`text-xs px-3 py-1.5 border rounded-full font-medium ${getTargetColor(item.주요대상)}`}>
                      {item.주요대상}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {item.주요변경사항및핵심특징}
                  </CardDescription>
                  <Button
                    onClick={() => window.open(item.공식웹사이트, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
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
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="flex gap-3 justify-center mb-8">
              <Button
                onClick={handleBackToCategories}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                홈
              </Button>
              <Button
                onClick={handleBackToSubCategories}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {selectedCategory}
              </Button>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
              {selectedCategory} → {selectedSubCategory}
            </h1>
            <p className="text-gray-600 text-lg font-medium">세부 카테고리별 에듀테크 솔루션</p>
          </div>

          <div className="space-y-12">
            {Object.entries(items as Record<string, EdutechItem[]>).map(([itemCategory, itemList]) => (
              <div key={itemCategory} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                    <Grid2x2 className="w-4 h-4 text-white" />
                  </div>
                  {itemCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemList.map((item: EdutechItem, index: number) => (
                    <Card key={index} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={getWebsiteThumbnail(item.공식웹사이트)}
                            alt={item.에듀테크명}
                            className="w-10 h-10 rounded-xl shadow-sm border border-gray-100"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23007AFF' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                            }}
                          />
                          <CardTitle className="text-lg text-gray-900 font-bold">{item.에듀테크명}</CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={`text-xs px-3 py-1 border rounded-full font-medium ${getPriceColor(item.가격정책)}`}>
                            {item.가격정책}
                          </Badge>
                          <Badge className={`text-xs px-3 py-1 border rounded-full font-medium ${getTargetColor(item.주요대상)}`}>
                            {item.주요대상}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {item.주요변경사항및핵심특징}
                        </CardDescription>
                        <Button
                          onClick={() => window.open(item.공식웹사이트, '_blank')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
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
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <Button
              onClick={handleBackToCategories}
              variant="ghost"
              className="mb-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full px-6 py-3 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              대분류로 돌아가기
            </Button>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
              {selectedCategory}
            </h1>
            <p className="text-gray-600 text-lg font-medium">세부 카테고리를 선택해주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {subCategories.map((subCategory, index) => (
              <Card
                key={subCategory}
                className="group cursor-pointer bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                <CardHeader className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                    <Book className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                    {subCategory}
                  </CardTitle>
                  <ChevronRight className="w-6 h-6 mx-auto text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200 text-blue-800 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            2025년 최신 에듀테크 트렌드
          </div>
          
          <h1 className="text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
            에듀테크
            <br />
            <span className="text-6xl text-blue-600">이노베이션 허브</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            교육의 미래를 선도하는 혁신적인 기술들을 탐험하고,
            <br />당신의 교육 환경을 한 단계 끌어올려 보세요
          </p>
          
          <div className="flex gap-6 justify-center mb-16">
            <Button
              onClick={handleShowAll}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              <Search className="w-6 h-6 mr-3" />
              전체 컬렉션 탐색
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category}
              className="group cursor-pointer bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => handleCategorySelect(category)}
            >
              <CardHeader className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                  <Grid2x2 className="w-12 h-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-xl text-gray-900 font-bold group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                  {category}
                </CardTitle>
                
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-gray-600 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            최종 검증일: 2025년 6월 | 교육 전문가를 위한 프리미엄 가이드
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Index;
