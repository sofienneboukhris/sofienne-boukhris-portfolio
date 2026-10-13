import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { analyticsService, VisitRecord, QuoteRequestRecord } from '../../services/analyticsService';
import { 
  BarChart3, Activity, Map as MapIcon, Monitor, Calendar, Clock, ArrowUpRight, 
  Search, Link, MousePointerClick, MessageSquare, Plus, Check, Filter
} from 'lucide-react';

export const AdminAnalyticsTab: React.FC = () => {
  const [data, setData] = useState(analyticsService.getData());
  const [dateRange, setDateRange] = useState<'today' | 'yesterday' | '7days' | '30days' | 'all'>('7days');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [osFilter, setOsFilter] = useState('all');
  const [browserFilter, setBrowserFilter] = useState('all');
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    setData(analyticsService.getData());
  }, [refreshTrigger]);

  const refreshData = () => setRefreshTrigger(r => r + 1);

  const filteredVisits = useMemo(() => {
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    return data.visits.filter(v => {
      // Date filter
      let passDate = true;
      if (dateRange === 'today') passDate = now - v.timestamp < msPerDay;
      else if (dateRange === 'yesterday') passDate = now - v.timestamp >= msPerDay && now - v.timestamp < msPerDay * 2;
      else if (dateRange === '7days') passDate = now - v.timestamp < msPerDay * 7;
      else if (dateRange === '30days') passDate = now - v.timestamp < msPerDay * 30;
      if (!passDate) return false;

      // Other filters
      if (sourceFilter !== 'all' && v.source !== sourceFilter) return false;
      if (osFilter !== 'all' && v.os !== osFilter) return false;
      if (browserFilter !== 'all' && v.browser !== browserFilter) return false;
      
      return true;
    });
  }, [data.visits, dateRange, sourceFilter, osFilter, browserFilter]);

  const filteredQuotes = useMemo(() => {
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    return data.quoteRequests.filter(q => {
      let passDate = true;
      if (dateRange === 'today') passDate = now - q.timestamp < msPerDay;
      else if (dateRange === 'yesterday') passDate = now - q.timestamp >= msPerDay && now - q.timestamp < msPerDay * 2;
      else if (dateRange === '7days') passDate = now - q.timestamp < msPerDay * 7;
      else if (dateRange === '30days') passDate = now - q.timestamp < msPerDay * 30;
      return passDate;
    });
  }, [data.quoteRequests, dateRange]);

  // Derived metrics
  const totalVisits = filteredVisits.length;
  const totalQuotes = filteredQuotes.length;
  
  // Chart Data: Visits over time (grouped by day)
  const visitsByDay = useMemo(() => {
    const map = new Map<string, number>();
    filteredVisits.forEach(v => {
      const date = new Date(v.timestamp).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
      map.set(date, (map.get(date) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredVisits]);

  // Chart Data: Top Pages
  const topPages = useMemo(() => {
    const map = new Map<string, number>();
    filteredVisits.forEach(v => {
      const p = v.path || '/';
      map.set(p, (map.get(p) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([path, count]) => ({ name: path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredVisits]);

  // Chart Data: Traffic Sources
  const trafficSources = useMemo(() => {
    const map = new Map<string, number>();
    filteredVisits.forEach(v => {
      map.set(v.source, (map.get(v.source) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([source, count]) => ({ name: source, value: count }))
      .sort((a, b) => b.value - a.value);
  }, [filteredVisits]);

  // Unique options for filters
  const uniqueSources = Array.from(new Set(data.visits.map(v => v.source))).filter(Boolean);
  const uniqueOs = Array.from(new Set(data.visits.map(v => v.os))).filter(Boolean);
  const uniqueBrowsers = Array.from(new Set(data.visits.map(v => v.browser))).filter(Boolean);

  const COLORS = ['#70ba65', '#2596be', '#e28743', '#873e23', '#76b5c5', '#154c79'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 bg-[#00283A] p-4 rounded-xl border border-[#0a3d54]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#70ba65]/10 rounded-lg">
              <Activity className="w-5 h-5 text-[#70ba65]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">Vue d'ensemble Analytique</h2>
              <p className="text-xs text-[#919ca1]">Analysez l'audience et les performances de votre site</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] text-white rounded-lg focus:border-[#70ba65] focus:outline-none"
            >
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="7days">7 derniers jours</option>
              <option value="30days">30 derniers jours</option>
              <option value="all">Tout le temps</option>
            </select>
            <button onClick={refreshData} className="px-3 py-1.5 text-xs bg-[#02162B] border border-[#0a3d54] text-[#70ba65] rounded-lg hover:bg-[#70ba65]/10 transition-colors">
              Rafraîchir
            </button>
          </div>
        </div>
        
        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#0a3d54]">
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#919ca1]" />
            <span className="text-xs text-[#919ca1]">Filtres :</span>
          </div>
          
          <select 
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-[#00151F] border border-[#0a3d54] text-white rounded focus:border-[#70ba65] focus:outline-none capitalize"
          >
            <option value="all">Toutes sources</option>
            {uniqueSources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={osFilter}
            onChange={(e) => setOsFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-[#00151F] border border-[#0a3d54] text-white rounded focus:border-[#70ba65] focus:outline-none"
          >
            <option value="all">Tous OS</option>
            {uniqueOs.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <select 
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-[#00151F] border border-[#0a3d54] text-white rounded focus:border-[#70ba65] focus:outline-none"
          >
            <option value="all">Tous navigateurs</option>
            {uniqueBrowsers.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#919ca1]">
            <span className="text-xs font-bold uppercase tracking-wider">Visites Totales</span>
            <Monitor className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalVisits}</div>
        </div>
        
        <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#919ca1]">
            <span className="text-xs font-bold uppercase tracking-wider">Demandes de Devis</span>
            <MessageSquare className="w-4 h-4 text-[#70ba65]" />
          </div>
          <div className="text-2xl font-bold text-[#70ba65] font-mono">{totalQuotes}</div>
        </div>

        <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#919ca1]">
            <span className="text-xs font-bold uppercase tracking-wider">Taux de Conversion</span>
            <Activity className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {totalVisits > 0 ? ((totalQuotes / totalVisits) * 100).toFixed(1) : '0'}%
          </div>
        </div>

        <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#919ca1]">
            <span className="text-xs font-bold uppercase tracking-wider">Pages uniques vues</span>
            <Link className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{topPages.length}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visits Chart */}
        <div className="lg:col-span-2 bg-[#00283A] p-5 rounded-xl border border-[#0a3d54]">
          <h3 className="text-sm font-bold text-white mb-4">Évolution des visites</h3>
          <div className="h-64">
            {visitsByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0a3d54" />
                  <XAxis dataKey="date" stroke="#919ca1" fontSize={10} tickMargin={10} />
                  <YAxis stroke="#919ca1" fontSize={10} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#00151F', borderColor: '#0a3d54', borderRadius: '8px' }}
                    itemStyle={{ color: '#70ba65' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#70ba65" strokeWidth={2} dot={{ r: 4, fill: '#70ba65' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#919ca1] text-xs">Pas de données pour cette période</div>
            )}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#00283A] p-5 rounded-xl border border-[#0a3d54]">
          <h3 className="text-sm font-bold text-white mb-4">Sources de trafic</h3>
          <div className="h-64">
            {trafficSources.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#00151F', borderColor: '#0a3d54', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', color: '#919ca1' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#919ca1] text-xs">Pas de données</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-[#00283A] p-5 rounded-xl border border-[#0a3d54]">
          <h3 className="text-sm font-bold text-white mb-4">Pages les plus consultées</h3>
          <div className="h-64">
            {topPages.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0a3d54" horizontal={false} />
                  <XAxis type="number" stroke="#919ca1" fontSize={10} hide />
                  <YAxis dataKey="name" type="category" stroke="#919ca1" fontSize={10} width={100} tickFormatter={(val) => val.length > 15 ? val.substring(0, 15) + '...' : val} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#00151F', borderColor: '#0a3d54', borderRadius: '8px' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="count" fill="#2596be" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#919ca1] text-xs">Pas de données</div>
            )}
          </div>
        </div>

        {/* Detailed Table (Latest 15 Visits) */}
        <div className="bg-[#00283A] p-5 rounded-xl border border-[#0a3d54] overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4">Dernières visites</h3>
          <div className="flex-1 overflow-auto pr-2">
            <div className="space-y-2 min-w-[400px]">
              {filteredVisits.slice().reverse().slice(0, 15).map((visit) => (
                <div key={visit.id} className="p-3 bg-[#00151F] rounded-lg border border-[#0a3d54] flex items-center justify-between text-xs transition-colors hover:border-[#70ba65]/50">
                  <div className="flex flex-col gap-1 w-1/3">
                    <span className="text-white font-bold truncate" title={visit.path}>{visit.path || '/'}</span>
                    <span className="text-[#919ca1] font-mono text-[10px]">
                      {new Date(visit.timestamp).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 w-1/4">
                    <span className="text-[#919ca1] capitalize flex items-center gap-1 truncate">
                      <MapIcon className="w-3 h-3 shrink-0" /> {visit.countryName}
                    </span>
                    <span className="text-[#70ba65] font-mono text-[10px] truncate" title={visit.referrer || visit.ip}>
                      {visit.referrer ? new URL(visit.referrer).hostname : visit.ip}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 w-1/3">
                    <span className="px-2 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[#919ca1] capitalize text-[10px]">
                      {visit.source}
                    </span>
                    <span className="text-[#919ca1] text-[10px]">
                      {visit.browser} • {visit.os}
                    </span>
                  </div>
                </div>
              ))}
              {filteredVisits.length === 0 && (
                <div className="text-center text-[#919ca1] text-xs py-10">Aucune visite enregistrée</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
