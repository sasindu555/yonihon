export default function PartnerForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Full Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          required
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Email <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          required
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Workshop Type
        </label>
        <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          <option>Pottery & Ceramics</option>
          <option>Tea Ceremony</option>
          <option>Calligraphy</option>
          <option>Cooking</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Location
        </label>
        <input
          type="text"
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Tell us about your workshop
        </label>
        <textarea
          rows={4}
          className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        Submit Your Workshop
      </button>
    </form>
  );
}
