import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">JewelAI</h3>
            <p className="text-sm text-secondary-foreground/70">
              AI-generated jewellery product photography that sells.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:hello@jewelai.com" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Get in Touch</h4>
            <p className="text-sm">
              <a href="mailto:hello@jewelai.com" className="hover:text-primary transition-colors">
                hello@jewelai.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2025 JewelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
