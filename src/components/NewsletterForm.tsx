export default function NewsletterForm() {
  return (
    <div className="bg-dark text-white rounded-lg p-6 md:p-8">
      <h3 className="text-lg font-bold">Get Japan Travel Tips in Your Inbox</h3>
      <p className="text-sm text-zinc-400 mt-2">
        Subscribe for travel guides, local tips, and exclusive updates.
      </p>
      <form className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-2.5 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-zinc-500 mt-2">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}
