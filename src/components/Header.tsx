
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">W</span>
          </div>
          <span className="text-white font-semibold text-lg">WEDNESDAY</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer">
            <span>Services</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer">
            <span>Case Studies</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer">
            <span>Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer">
            <span>Resources</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer">
            <span>About Us</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
            Let's Talk
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
