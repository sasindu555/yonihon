export default function BookingForm({ hostName }: { hostName?: string }) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <h3 className="text-lg font-bold text-zinc-900 mb-4">Book Your Experience</h3>
      {hostName && (
        <p className="text-sm text-zinc-600 mb-4 font-medium">{hostName}</p>
      )}
      <form className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1 uppercase tracking-wider">
            1. Choose a date
          </label>
          <input
            type="date"
            className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1 uppercase tracking-wider">
            2. Pick a time
          </label>
          <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-zinc-400">
            <option>No times available on this day</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 mb-1 uppercase tracking-wider">
            3. Your details
          </label>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name *"
              required
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email address *"
              required
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <input
              type="number"
              min={1}
              max={4}
              placeholder="Number of people (1-4)"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <textarea
              rows={3}
              placeholder="Notes (optional)"
              className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
