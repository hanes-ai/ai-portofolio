
export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">H</div>
          <span className="font-headline font-bold text-lg">Hanes Folio</span>
        </div>
        
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Hanes Portfolio. All Rights Reserved.
        </p>
        
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-primary/10 blur-[100px] pointer-events-none" />
    </footer>
  );
}
