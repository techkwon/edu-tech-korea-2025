import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Home, Book, Grid2x2, Sparkles, ArrowLeft, ExternalLink, Star, TrendingUp } from "lucide-react";
import { edutechData } from "@/data/edutechData";
import { SearchBar } from "@/components/SearchBar";

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
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const categories = Object.keys(edutechData);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setShowAll(false);
    setSearchQuery('');
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSearchQuery('');
  };

  const handleBackToCategories = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setShowAll(false);
    setSearchQuery('');
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory('');
    setSearchQuery('');
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedCategory('');
    setSelectedSubCategory('');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowAll(true);
      setSelectedCategory('');
      setSelectedSubCategory('');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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

  const filteredItems = useMemo(() => {
    const allItems = getAllEdutechItems();
    if (!searchQuery.trim()) {
      return allItems;
    }

    const query = searchQuery.toLowerCase();
    return allItems.filter(item => 
      item.에듀테크명.toLowerCase().includes(query) ||
      item.주요변경사항및핵심특징.toLowerCase().includes(query) ||
      item.대분류.toLowerCase().includes(query) ||
      item.중분류.toLowerCase().includes(query) ||
      item.소분류.toLowerCase().includes(query) ||
      item.주요대상.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const allItems = getAllEdutechItems();
    const suggestions = new Set<string>();
    
    allItems.forEach(item => {
      if (item.에듀테크명.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(item.에듀테크명);
      }
    });
    
    return Array.from(suggestions);
  }, [searchQuery]);

  const getWebsiteThumbnail = (url: string) => {
    try {
      if (!url || url.trim() === '' || url === '해당 없음') {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
      }
      
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (error) {
      console.warn('Invalid URL:', url);
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case '무료': return 'bg-black text-white border-black';
      case '부분 유료': return 'bg-gray-800 text-white border-gray-800';
      case '유료': case '유료(구독)': case '유료(B2B/B2G)': return 'bg-gray-600 text-white border-gray-600';
      case '하드웨어 유료': return 'bg-gray-400 text-white border-gray-400';
      case '기업용(B2B)': return 'bg-gray-200 text-black border-gray-200';
      default: return 'bg-gray-100 text-black border-gray-100';
    }
  };

  const getTargetColor = (target: string) => {
    if (target.includes('초')) return 'bg-black text-white border-black';
    if (target.includes('중')) return 'bg-gray-800 text-white border-gray-800';
    if (target.includes('고')) return 'bg-gray-600 text-white border-gray-600';
    if (target.includes('대학')) return 'bg-gray-400 text-white border-gray-400';
    if (target.includes('교원')) return 'bg-gray-200 text-black border-gray-200';
    return 'bg-gray-100 text-black border-gray-100';
  };

  if (showAll || searchQuery.trim()) {
    const itemsToShow = searchQuery.trim() ? filteredItems : getAllEdutechItems();
    
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-12">
            <Button
              onClick={handleBackToCategories}
              variant="ghost"
              className="mb-8 text-gray-300 hover:text-white hover:bg-white/10 rounded-full px-6 py-3 transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              <Home className="w-5 h-5 mr-3" />
              홈으로 돌아가기
            </Button>
            
            <div className="space-y-6 mb-12">
              <h1 className="text-6xl font-extralight tracking-tight text-white leading-none">
                {searchQuery.trim() ? '검색 결과' : 'EDUTECH'}
                <span className="block text-4xl font-light text-gray-400 mt-2">
                  {searchQuery.trim() ? `"${searchQuery}"` : 'COLLECTION'}
                </span>
              </h1>
              <div className="w-24 h-[1px] bg-white mx-auto"></div>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                {searchQuery.trim() 
                  ? `${itemsToShow.length}개의 검색 결과를 찾았습니다`
                  : `총 ${itemsToShow.length}개의 혁신적인 교육 솔루션`
                }
              </p>
            </div>

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              suggestions={searchSuggestions}
              onClearSearch={handleClearSearch}
              showAdvanced={showAdvancedSearch}
              onToggleAdvanced={() => setShowAdvancedSearch(!showAdvancedSearch)}
            />
          </div>

          {itemsToShow.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">검색 결과가 없습니다</h3>
              <p className="text-gray-400 mb-8">다른 키워드로 검색해보세요</p>
              <Button
                onClick={handleClearSearch}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                검색 초기화
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {itemsToShow.map((item, index) => (
                <Card key={index} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10">
                  <CardHeader className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <img
                          src={getWebsiteThumbnail(item.공식웹사이트)}
                          alt={item.에듀테크명}
                          className="w-6 h-6 opacity-80"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white font-light leading-tight mb-3">{item.에듀테크명}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-white/10 text-gray-300 border-white/20 rounded-full font-light backdrop-blur-sm">{item.대분류}</Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-white/10 text-gray-300 border-white/20 rounded-full font-light backdrop-blur-sm">{item.중분류}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-6">
                      <Badge className={`text-xs px-4 py-2 border rounded-full font-light backdrop-blur-sm ${getPriceColor(item.가격정책)}`}>
                        {item.가격정책}
                      </Badge>
                      <Badge className={`text-xs px-4 py-2 border rounded-full font-light backdrop-blur-sm ${getTargetColor(item.주요대상)}`}>
                        {item.주요대상}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-sm text-gray-400 mb-8 line-clamp-3 leading-relaxed font-light">
                      {item.주요변경사항및핵심특징}
                    </CardDescription>
                    <Button
                      onClick={() => window.open(item.공식웹사이트, '_blank')}
                      className="w-full bg-white text-black hover:bg-gray-100 font-light py-4 rounded-2xl transition-all duration-300 shadow-none hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4 mr-3" />
                      웹사이트 방문
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedCategory && selectedSubCategory) {
    const items = (edutechData as any)[selectedCategory]?.[selectedSubCategory];
    if (!items) return null;

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <div className="flex gap-4 justify-center mb-12">
              <Button
                onClick={handleBackToCategories}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full px-6 py-3 transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                홈
              </Button>
              <Button
                onClick={handleBackToSubCategories}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full px-6 py-3 transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {selectedCategory}
              </Button>
            </div>
            
            <h1 className="text-6xl font-extralight tracking-tight text-white mb-2 leading-none">
              {selectedCategory}
            </h1>
            <div className="w-16 h-[1px] bg-white mx-auto mb-4"></div>
            <h2 className="text-4xl font-light text-gray-400 mb-6">{selectedSubCategory}</h2>
          </div>

          <div className="space-y-16">
            {Object.entries(items as Record<string, EdutechItem[]>).map(([itemCategory, itemList]) => (
              <div key={itemCategory} className="bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-md">
                <h2 className="text-3xl font-light text-white mb-10 flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-4"></div>
                  {itemCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {itemList.map((item: EdutechItem, index: number) => (
                    <Card key={index} className="group bg-white/5 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <img
                              src={getWebsiteThumbnail(item.공식웹사이트)}
                              alt={item.에듀테크명}
                              className="w-5 h-5 opacity-80"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <CardTitle className="text-lg text-white font-light">{item.에듀테크명}</CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={`text-xs px-3 py-1 border rounded-full font-light ${getPriceColor(item.가격정책)}`}>
                            {item.가격정책}
                          </Badge>
                          <Badge className={`text-xs px-3 py-1 border rounded-full font-light ${getTargetColor(item.주요대상)}`}>
                            {item.주요대상}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <CardDescription className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
                          {item.주요변경사항및핵심특징}
                        </CardDescription>
                        <Button
                          onClick={() => window.open(item.공식웹사이트, '_blank')}
                          className="w-full bg-white text-black hover:bg-gray-100 font-light py-3 rounded-xl transition-all duration-300"
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
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-20">
            <Button
              onClick={handleBackToCategories}
              variant="ghost"
              className="mb-12 text-gray-300 hover:text-white hover:bg-white/10 rounded-full px-8 py-4 transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              대분류로 돌아가기
            </Button>
            
            <h1 className="text-7xl font-extralight tracking-tight text-white mb-4 leading-none">
              {selectedCategory}
            </h1>
            <div className="w-20 h-[1px] bg-white mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 font-light">세부 카테고리를 선택해주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {subCategories.map((subCategory, index) => (
              <Card
                key={subCategory}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-white/10"
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                <CardHeader className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm border border-white/20">
                    <Book className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white font-light group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-tight">
                    {subCategory}
                  </CardTitle>
                  <ChevronRight className="w-6 h-6 mx-auto text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-32">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full border border-white/20 text-gray-300 text-sm font-light mb-12 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-3 text-white" />
            2025년 최신 에듀테크 트렌드
          </div>
          
          <div className="space-y-8 mb-20">
            <h1 className="text-9xl font-extralight tracking-tight text-white leading-none">
              EDUTECH
            </h1>
            <div className="w-32 h-[1px] bg-white mx-auto"></div>
            <h2 className="text-5xl font-light text-gray-400 leading-tight">
              INNOVATION HUB
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            교육의 미래를 선도하는 혁신적인 기술들을 탐험하고,
            <br />당신의 교육 환경을 한 단계 끌어올려 보세요
          </p>
          
          <div className="mb-20">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              suggestions={searchSuggestions}
              onClearSearch={handleClearSearch}
              showAdvanced={showAdvancedSearch}
              onToggleAdvanced={() => setShowAdvancedSearch(!showAdvancedSearch)}
            />
          </div>
          
          <div className="flex gap-8 justify-center mb-24">
            <Button
              onClick={handleShowAll}
              className="bg-white text-black hover:bg-gray-100 font-light py-6 px-12 rounded-2xl transition-all duration-300 shadow-none hover:shadow-2xl hover:shadow-white/20 text-lg"
            >
              <Sparkles className="w-6 h-6 mr-4" />
              전체 컬렉션 탐색
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-white/10"
              onClick={() => handleCategorySelect(category)}
            >
              <CardHeader className="text-center py-16">
                <div className="relative w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm border border-white/20">
                  <Grid2x2 className="w-12 h-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-black" />
                  </div>
                </div>
                
                <CardTitle className="text-xl text-white font-light group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-tight">
                  {category}
                </CardTitle>
                
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-32">
          <div className="inline-flex items-center px-8 py-4 bg-white/5 rounded-2xl border border-white/20 text-gray-400 text-sm backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full mr-4 animate-pulse"></div>
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

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1f1f1f;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #606060;
        }
        
        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Index;
