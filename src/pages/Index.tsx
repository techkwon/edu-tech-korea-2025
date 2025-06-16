
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Book, Grid2x2, Search } from "lucide-react";
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
      case '무료': return 'bg-green-100 text-green-800 border-green-200';
      case '부분 유료': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '유료': case '유료(구독)': case '유료(B2B/B2G)': return 'bg-red-100 text-red-800 border-red-200';
      case '하드웨어 유료': return 'bg-purple-100 text-purple-800 border-purple-200';
      case '기업용(B2B)': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTargetColor = (target: string) => {
    if (target.includes('초')) return 'bg-orange-100 text-orange-800';
    if (target.includes('중')) return 'bg-blue-100 text-blue-800';
    if (target.includes('고')) return 'bg-purple-100 text-purple-800';
    if (target.includes('대학')) return 'bg-indigo-100 text-indigo-800';
    if (target.includes('교원')) return 'bg-emerald-100 text-emerald-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (showAll) {
    const allItems = getAllEdutechItems();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Button
              onClick={handleBackToCategories}
              variant="outline"
              className="mb-4 hover:bg-blue-50 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
              2025년 대한민국 에듀테크 종합 목록
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              총 {allItems.length}개의 에듀테크 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={getWebsiteThumbnail(item.공식웹사이트)}
                      alt={item.에듀테크명}
                      className="w-8 h-8 rounded-md shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <CardTitle className="text-lg text-gray-800">{item.에듀테크명}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">{item.대분류}</Badge>
                        <Badge variant="outline" className="text-xs">{item.중분류}</Badge>
                        <Badge variant="outline" className="text-xs">{item.소분류}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`text-xs ${getPriceColor(item.가격정책)}`}>
                      {item.가격정책}
                    </Badge>
                    <Badge className={`text-xs ${getTargetColor(item.주요대상)}`}>
                      {item.주요대상}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {item.주요변경사항및핵심특징}
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(item.공식웹사이트, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                    >
                      웹사이트 방문
                    </Button>
                  </div>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex gap-2 justify-center mb-4">
              <Button
                onClick={handleBackToCategories}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-1" />
                홈
              </Button>
              <Button
                onClick={handleBackToSubCategories}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 transition-all duration-300"
              >
                ← {selectedCategory}
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
              {selectedCategory} → {selectedSubCategory}
            </h1>
            <p className="text-gray-600">에듀테크 서비스 목록</p>
          </div>

          <div className="space-y-6">
            {Object.entries(items as Record<string, EdutechItem[]>).map(([itemCategory, itemList]) => (
              <div key={itemCategory} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Grid2x2 className="w-5 h-5 mr-2 text-blue-600" />
                  {itemCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {itemList.map((item: EdutechItem, index: number) => (
                    <Card key={index} className="hover:shadow-md transition-all duration-300 hover:scale-105 bg-white border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={getWebsiteThumbnail(item.공식웹사이트)}
                            alt={item.에듀테크명}
                            className="w-8 h-8 rounded-md shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                            }}
                          />
                          <CardTitle className="text-lg text-gray-800">{item.에듀테크명}</CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={`text-xs ${getPriceColor(item.가격정책)}`}>
                            {item.가격정책}
                          </Badge>
                          <Badge className={`text-xs ${getTargetColor(item.주요대상)}`}>
                            {item.주요대상}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-gray-600 mb-3">
                          {item.주요변경사항및핵심특징}
                        </CardDescription>
                        <Button
                          size="sm"
                          onClick={() => window.open(item.공식웹사이트, '_blank')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                        >
                          웹사이트 방문
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Button
              onClick={handleBackToCategories}
              variant="outline"
              className="mb-4 hover:bg-blue-50 transition-all duration-300"
            >
              ← 대분류로 돌아가기
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
              {selectedCategory}
            </h1>
            <p className="text-gray-600">중분류를 선택해주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {subCategories.map((subCategory) => (
              <Card
                key={subCategory}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:bg-blue-50"
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-gray-800 flex items-center justify-center">
                    <Book className="w-6 h-6 mr-2 text-blue-600" />
                    {subCategory}
                  </CardTitle>
                  <ChevronRight className="w-6 h-6 mx-auto text-gray-400" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* 동적 배경 요소들 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-orange-200/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-200/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-purple-200/30 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            2025년 대한민국 에듀테크 종합 목록
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            교육 현장에서 활용 가능한 주요 에듀테크 서비스를 한눈에 살펴보세요
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button
              onClick={handleShowAll}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              전체 목록 보기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-white group animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
              onClick={() => handleCategorySelect(category)}
            >
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Grid2x2 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  {category}
                </CardTitle>
                <ChevronRight className="w-6 h-6 mx-auto text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            최종 검증일: 2025년 6월 | 교육 전문가를 위한 종합 가이드
          </p>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%234F46E5" opacity="0.3"/><circle cx="10" cy="10" r="3" fill="%234F46E5"/></svg>'), auto;
        }

        .cursor-pointer {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%23059669" opacity="0.4"/><circle cx="10" cy="10" r="4" fill="%23059669"/></svg>'), pointer;
        }
      `}</style>
    </div>
  );
};

export default Index;
