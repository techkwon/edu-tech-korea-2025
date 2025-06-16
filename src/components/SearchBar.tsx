
import React from 'react';
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  suggestions?: string[];
  onClearSearch: () => void;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  suggestions = [],
  onClearSearch,
  showAdvanced = false,
  onToggleAdvanced
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-400 z-10" />
          <Input
            type="text"
            placeholder="에듀테크 솔루션 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-20 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm rounded-2xl focus:bg-white/15 focus:border-white/30 transition-all duration-300"
          />
          <div className="absolute right-3 flex items-center gap-2">
            {searchQuery && (
              <Button
                onClick={onClearSearch}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {onToggleAdvanced && (
              <Button
                onClick={onToggleAdvanced}
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded-full transition-colors ${
                  showAdvanced 
                    ? 'text-white bg-white/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {searchQuery && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <Command className="bg-black/90 border border-white/20 rounded-xl backdrop-blur-md">
              <CommandList className="max-h-60">
                <CommandEmpty className="py-6 text-center text-gray-400">
                  검색 결과가 없습니다.
                </CommandEmpty>
                <CommandGroup>
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => onSearchChange(suggestion)}
                      className="text-white hover:bg-white/10 cursor-pointer py-3 px-4"
                    >
                      <Search className="mr-3 h-4 w-4 text-gray-400" />
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
};
