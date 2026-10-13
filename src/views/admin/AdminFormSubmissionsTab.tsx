import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Eye, Calendar, MessageSquare, User, X } from 'lucide-react';

export const AdminFormSubmissionsTab: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState<any | null>(null);

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/form-submissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/form-submissions/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      fetchSubs();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSub = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/form-submissions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSelectedSub(null);
      fetchSubs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSubs = submissions.filter(s => {
    const matchesSearch = 
      (s.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.clientEmail || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.message || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Formulaires & Messages</h2>
          <p className="text-sm text-[#919ca1] mt-1">Gérez les prises de contact depuis le site</p>
        </div>
      </div>

      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919ca1]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#00151F] border border-[#0a3d54] rounded-lg text-white text-sm focus:outline-none focus:border-[#70ba65] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#919ca1]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#00151F] border border-[#0a3d54] rounded-lg text-white text-sm focus:outline-none focus:border-[#70ba65] transition-colors"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="read">Lu</option>
            <option value="replied">Répondu</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#dedee0]">
            <thead className="bg-[#02162B] text-[#919ca1] font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Expéditeur</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Aperçu Message</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a3d54]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">Chargement des messages...</td>
                </tr>
              ) : filteredSubs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">Aucun message trouvé.</td>
                </tr>
              ) : (
                filteredSubs.map(sub => (
                  <tr key={sub.id} className="hover:bg-[#00151F]/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(sub.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-white">{sub.clientName || 'Anonyme'}</div>
                      <div className="text-xs text-[#919ca1]">{sub.clientEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 bg-[#02162B] text-[#919ca1] rounded-md font-mono">
                        {sub.source || 'contact'}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {sub.message}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={sub.status}
                        onChange={(e) => updateStatus(sub.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-md font-bold border-none focus:ring-0 ${
                          sub.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                          sub.status === 'read' ? 'bg-gray-500/20 text-gray-400' :
                          sub.status === 'replied' ? 'bg-green-500/20 text-green-400' :
                          'bg-[#02162B] text-[#919ca1]'
                        }`}
                      >
                        <option value="new">Nouveau</option>
                        <option value="read">Lu</option>
                        <option value="replied">Répondu</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-1.5 text-[#919ca1] hover:text-white hover:bg-[#0a3d54] rounded-lg transition-colors"
                        title="Lire"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSub(sub.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors ml-2"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#00283A] w-full max-w-2xl rounded-2xl border border-[#0a3d54] shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-[#0a3d54] flex items-center justify-between sticky top-0 bg-[#00283A] rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#70ba65]" />
                Message de {selectedSub.clientName || 'Anonyme'}
              </h3>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-2 text-[#919ca1] hover:text-white hover:bg-[#02162B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl flex flex-wrap gap-6">
                <div>
                  <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider block mb-1">Email</span>
                  <a href={`mailto:${selectedSub.clientEmail}`} className="text-white font-bold hover:text-[#70ba65] transition-colors">
                    {selectedSub.clientEmail || '-'}
                  </a>
                </div>
                <div>
                  <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider block mb-1">Téléphone</span>
                  <a href={`tel:${selectedSub.clientPhone}`} className="text-white font-bold hover:text-[#70ba65] transition-colors">
                    {selectedSub.clientPhone || '-'}
                  </a>
                </div>
                <div>
                  <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider block mb-1">Source</span>
                  <span className="text-[#919ca1] font-mono text-sm">{selectedSub.source || '-'}</span>
                </div>
                <div>
                  <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider block mb-1">Date</span>
                  <span className="text-[#919ca1] font-mono text-sm">
                    {new Date(selectedSub.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl">
                <h4 className="text-xs font-bold text-[#919ca1] uppercase tracking-wider mb-3">Message</h4>
                <div className="text-white text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedSub.message || <span className="text-[#919ca1] italic">Aucun message</span>}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[#0a3d54] flex justify-end gap-3">
              <a
                href={`mailto:${selectedSub.clientEmail}?subject=Réponse à votre demande sur Boukhris`}
                className="px-4 py-2 bg-[#70ba65] text-[#00151F] text-sm font-bold rounded-lg hover:bg-[#70ba65]/90 transition-colors"
                onClick={() => {
                  if (selectedSub.status === 'new' || selectedSub.status === 'read') {
                    updateStatus(selectedSub.id, 'replied');
                  }
                }}
              >
                Répondre par email
              </a>
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 bg-[#02162B] text-white text-sm font-bold rounded-lg hover:bg-[#0a3d54] transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
