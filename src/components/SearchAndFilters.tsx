import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Search, Grid, List, X } from 'lucide-react';
import { departments } from '../data/teamMembers';

export type SortOption = 'name' | 'role' | 'experience';
export type ViewMode = 'grid' | 'list';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedDepartments: string[];
  onDepartmentToggle: (department: string) => void;
  showAvailableOnly: boolean;
  onAvailableToggle: (checked: boolean) => void;
  showFavoritesOnly: boolean;
  onFavoritesToggle: (checked: boolean) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedDepartments,
  onDepartmentToggle,
  showAvailableOnly,
  onAvailableToggle,
  showFavoritesOnly,
  onFavoritesToggle,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}: SearchAndFiltersProps) {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const clearAllFilters = () => {
    onSearchChange('');
    selectedDepartments.forEach(dept => onDepartmentToggle(dept));
    onAvailableToggle(false);
    onFavoritesToggle(false);
  };

  const hasActiveFilters = searchTerm || selectedDepartments.length > 0 || showAvailableOnly || showFavoritesOnly;

  return (
    <div className="space-y-6 mb-8 relative">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg transition-all duration-300 hover:shadow-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary transition-colors duration-300" />
          <Input
            placeholder="Search by name, role, department, or skill..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-base bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-primary/50 placeholder:text-muted-foreground/70 transition-all duration-300"
          />
          {searchTerm && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => onSearchChange('')}
                className="p-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X className="h-4 w-4 text-primary" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md relative overflow-hidden bg-card border-border/50 hover:border-primary/40 backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Filters {hasActiveFilters && `(${
                (searchTerm ? 1 : 0) + 
                selectedDepartments.length + 
                (showAvailableOnly ? 1 : 0) + 
                (showFavoritesOnly ? 1 : 0)
              })`}
            </span>
            {hasActiveFilters && (
              <div className="absolute inset-0 bg-primary/5 transition-opacity duration-300" />
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-destructive/10 hover:text-destructive group"
            >
              <X className="h-3 w-3 mr-1 transition-transform duration-300 group-hover:rotate-90" />
              Clear All
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-select" className="text-sm whitespace-nowrap font-medium text-foreground transition-colors duration-300">Sort by:</Label>
            <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
              <SelectTrigger className="w-auto bg-card border-border/50 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm" id="sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="role">Role</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border rounded-lg p-1 bg-card/50 border-border/50 backdrop-blur-sm">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <Grid className={`h-4 w-4 transition-all duration-300 ${viewMode === 'grid' ? 'scale-110' : ''}`} />
              {viewMode === 'grid' && (
                <div className="absolute inset-0 bg-primary/10 rounded transition-opacity duration-300" />
              )}
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <List className={`h-4 w-4 transition-all duration-300 ${viewMode === 'list' ? 'scale-110' : ''}`} />
              {viewMode === 'list' && (
                <div className="absolute inset-0 bg-primary/10 rounded transition-opacity duration-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {isFiltersExpanded && (
        <div className="relative">
          <Card className="relative bg-card/80 backdrop-blur-sm border-border/50 shadow-xl transition-all duration-500">
            <CardContent className="p-6 space-y-6">
              {/* Department Chips */}
              <div>
                <Label className="mb-3 block font-medium text-base text-foreground transition-colors duration-300">Departments:</Label>
                <div className="flex flex-wrap gap-3">
                  {departments.map((department) => (
                    <Badge
                      key={department}
                      variant={selectedDepartments.includes(department) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group text-sm py-2 px-4 ${
                        selectedDepartments.includes(department) 
                          ? 'shadow-lg hover:shadow-xl bg-primary text-primary-foreground' 
                          : 'hover:bg-primary/10 hover:shadow-md border-border/50 hover:border-primary/40'
                      }`}
                      onClick={() => onDepartmentToggle(department)}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedDepartments.includes(department) ? 'bg-primary-foreground' : 'bg-primary'} animate-pulse`} />
                        {department}
                        {selectedDepartments.includes(department) && (
                          <X className="h-3 w-3 transition-transform duration-300 hover:rotate-90" />
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center space-x-3 group">
                  <Switch
                    id="available-only"
                    checked={showAvailableOnly}
                    onCheckedChange={onAvailableToggle}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <Label htmlFor="available-only" className="font-medium cursor-pointer group-hover:text-primary transition-colors duration-300">
                    Available only
                  </Label>
                  {showAvailableOnly && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </div>
                
                <div className="flex items-center space-x-3 group">
                  <Switch
                    id="favorites-only"
                    checked={showFavoritesOnly}
                    onCheckedChange={onFavoritesToggle}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <Label htmlFor="favorites-only" className="font-medium cursor-pointer group-hover:text-primary transition-colors duration-300">
                    Favorites only
                  </Label>
                  {showFavoritesOnly && <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}