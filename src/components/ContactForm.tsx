export default function ContactForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Your Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Email Address <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          required
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Subject
        </label>
        <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          <option>General Question</option>
          <option>Experience Inquiry</option>
          <option>Partnership</option>
          <option>Press / Media</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Your Message <span className="text-primary">*</span>
        </label>
        <textarea
          rows={5}
          required
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
