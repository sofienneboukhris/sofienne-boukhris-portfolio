import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Eye, Calendar, DollarSign, User, X, Calculator } from 'lucide-react';

export const AdminCalculatorLeadsTab: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/calculator-leads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/calculator-leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLead = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette demande ?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/calculator-leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      (l.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.clientEmail || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.projectTypeName || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Demandes Calculator</h2>
          <p className="text-sm text-[#919ca1] mt-1">Gérez les demandes de devis générées via le Calculator</p>
        </div>
      </div>

      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919ca1]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, projet..."
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
            <option value="contacted">Contacté</option>
            <option value="won">Gagné</option>
            <option value="lost">Perdu</option>
          </select>
        </div>
      </div>

      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#dedee0]">
            <thead className="bg-[#02162B] text-[#919ca1] font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Projet</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a3d54]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">Chargement des demandes...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">Aucune demande trouvée.</td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-[#00151F]/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-white">{lead.clientName || 'Anonyme'}</div>
                      <div className="text-xs text-[#919ca1]">{lead.clientEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-[#70ba65]">{lead.projectTypeName}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">
                      {lead.calculatedPrice} {lead.currency}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-md font-bold border-none focus:ring-0 ${
                          lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                          lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                          lead.status === 'won' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="won">Gagné</option>
                        <option value="lost">Perdu</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 text-[#919ca1] hover:text-white hover:bg-[#0a3d54] rounded-lg transition-colors"
                        title="Voir le détail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
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

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#00283A] w-full max-w-2xl rounded-2xl border border-[#0a3d54] shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-[#0a3d54] flex items-center justify-between sticky top-0 bg-[#00283A] rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#70ba65]" />
                Détail de la demande #{selectedLead.id}
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 text-[#919ca1] hover:text-white hover:bg-[#02162B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[#919ca1] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" /> Client
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-[#919ca1]">Nom :</span> <span className="text-white font-bold">{selectedLead.clientName || '-'}</span></p>
                    <p><span className="text-[#919ca1]">Email :</span> <span className="text-white font-bold">{selectedLead.clientEmail || '-'}</span></p>
                    <p><span className="text-[#919ca1]">Téléphone :</span> <span className="text-white font-bold">{selectedLead.clientPhone || '-'}</span></p>
                    <p><span className="text-[#919ca1]">Société :</span> <span className="text-white font-bold">{selectedLead.clientCompany || '-'}</span></p>
                  </div>
                </div>
                <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[#919ca1] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Projet & Budget
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-[#919ca1]">Type :</span> <span className="text-white font-bold">{selectedLead.projectTypeName}</span></p>
                    <p><span className="text-[#919ca1]">Budget Calculé :</span> <span className="text-[#70ba65] font-black">{selectedLead.calculatedPrice} {selectedLead.currency}</span></p>
                    <p><span className="text-[#919ca1]">Date :</span> <span className="text-white">
                      {new Date(selectedLead.createdAt).toLocaleString('fr-FR')}
                    </span></p>
                  </div>
                </div>
              </div>

              <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl">
                <h4 className="text-xs font-bold text-[#919ca1] uppercase tracking-wider mb-3">Options & Paramètres</h4>
                <div className="space-y-2 text-sm">
                  {selectedLead.options && Object.entries(selectedLead.options).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-[#0a3d54]/50 pb-1">
                      <span className="text-[#919ca1] capitalize">{key}</span>
                      <span className="text-white font-bold">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLead.selectedFeatures && selectedLead.selectedFeatures.length > 0 && (
                <div className="bg-[#00151F] border border-[#0a3d54] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[#919ca1] uppercase tracking-wider mb-3">Modules Sélectionnés</h4>
                  <ul className="list-disc list-inside text-sm text-white space-y-1">
                    {selectedLead.selectedFeatures.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-[#0a3d54] flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
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
