import { useState } from "react";
import {
  Users, UserPlus, Calendar, Heart, Search, Filter,
  ChevronRight, TrendingUp, Bell, BookOpen, ArrowUpRight,
  MoreHorizontal, CheckCircle, Clock, ChevronLeft, Menu, Home
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Members", value: "324", change: "+8 this month", icon: Users, trend: "up" },
  { label: "Active Members", value: "298", change: "92% active rate", icon: CheckCircle, trend: "up" },
  { label: "New Visitors", value: "14", change: "This month", icon: UserPlus, trend: "up" },
  { label: "Last Attendance", value: "186", change: "Sunday 1 Jun", icon: Calendar, trend: "neutral" },
];

const recentVisitors = [
  { name: "Maria Santos", phone: "+63 917 456 7890", area: "Minglanilla", type: "First Time", date: "1 Jun", wantsContact: true, status: "pending" },
  { name: "Juan dela Cruz", phone: "+63 918 123 4567", area: "Talisay City", type: "Returning", date: "1 Jun", wantsContact: false, status: "contacted" },
  { name: "Ana Reyes", phone: "+63 919 987 6543", area: "Naga City", type: "First Time", date: "25 May", wantsContact: true, status: "converted" },
  { name: "Carlo Bautista", phone: "+63 920 321 0987", area: "Cebu City", type: "First Time", date: "25 May", wantsContact: true, status: "pending" },
  { name: "Liza Mendoza", phone: "+63 921 654 3210", area: "San Fernando", type: "Returning", date: "18 May", wantsContact: false, status: "contacted" },
];

const members = [
  { name: "Daniel Santos", email: "d.santos@ecc.org.ph", status: "Active", ministry: "Leadership", baptised: true, joined: "2008-01-15" },
  { name: "Ruth Santos", email: "r.santos@ecc.org.ph", status: "Active", ministry: "Women's Ministry", baptised: true, joined: "2008-01-15" },
  { name: "Joseph Reyes", email: "j.reyes@ecc.org.ph", status: "Active", ministry: "Administration", baptised: true, joined: "2010-03-20" },
  { name: "Sarah Garcia", email: "s.garcia@ecc.org.ph", status: "Active", ministry: "Youth Ministry", baptised: true, joined: "2012-07-01" },
  { name: "Mark Dela Cruz", email: "m.delacruz@ecc.org.ph", status: "Active", ministry: "Worship Team", baptised: true, joined: "2015-02-10" },
  { name: "Grace Bautista", email: "g.bautista@ecc.org.ph", status: "Active", ministry: "Worship Team", baptised: true, joined: "2016-06-05" },
  { name: "Paolo Ramos", email: "p.ramos@ecc.org.ph", status: "Active", ministry: "Youth Ministry", baptised: false, joined: "2020-09-14" },
  { name: "Miriam Torres", email: "m.torres@ecc.org.ph", status: "Active", ministry: "Ushers", baptised: true, joined: "2011-04-22" },
];

const attendanceData = [
  { week: "5 Jan", count: 162 },
  { week: "12 Jan", count: 178 },
  { week: "19 Jan", count: 155 },
  { week: "26 Jan", count: 190 },
  { week: "2 Feb", count: 201 },
  { week: "9 Feb", count: 185 },
  { week: "16 Feb", count: 192 },
  { week: "2 Mar", count: 208 },
  { week: "9 Mar", count: 195 },
  { week: "16 Mar", count: 221 },
  { week: "6 Apr", count: 245 },
  { week: "13 Apr", count: 198 },
  { week: "4 May", count: 184 },
  { week: "11 May", count: 176 },
  { week: "18 May", count: 181 },
  { week: "25 May", count: 189 },
  { week: "1 Jun", count: 186 },
];

const givingData = [
  { month: "Jan", tithe: 92250, offering: 26000, building: 15500 },
  { month: "Feb", tithe: 106500, offering: 24000, building: 14500 },
  { month: "Mar", tithe: 99000, offering: 30500, building: 17000 },
  { month: "Apr", tithe: 123000, offering: 36000, building: 20500 },
  { month: "May", tithe: 110500, offering: 29500, building: 19000 },
  { month: "Jun", tithe: 84000, offering: 22000, building: 13000 },
];

const prayerRequests = [
  { name: "Anonymous", request: "Healing for a family member going through surgery next week.", visibility: "Private", status: "Open", date: "3 Jun" },
  { name: "Lerato M.", request: "Wisdom and guidance for an important career decision.", visibility: "Public", status: "Prayed For", date: "2 Jun" },
  { name: "Anonymous", request: "Restoration in a broken marriage. Please pray for reconciliation.", visibility: "Private", status: "Open", date: "1 Jun" },
  { name: "Carlo B.", request: "Financial breakthrough — believing God for provision.", visibility: "Public", status: "Open", date: "30 May" },
];

type AdminSection = "overview" | "members" | "visitors" | "giving" | "attendance" | "prayer";

const sidebarItems: { id: AdminSection; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Dashboard", icon: TrendingUp },
  { id: "members", label: "Members", icon: Users },
  { id: "visitors", label: "Visitor Inbox", icon: UserPlus },
  { id: "giving", label: "Giving Records", icon: Heart },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "prayer", label: "Prayer Requests", icon: BookOpen },
];

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [memberSearch, setMemberSearch] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.ministry.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ${
          sidebarExpanded ? "w-56" : "w-14"
        }`}
      >
        {/* Sidebar header */}
        <div className={`flex items-center border-b border-sidebar-border h-14 ${sidebarExpanded ? "px-5 justify-between" : "px-0 justify-center"}`}>
          {sidebarExpanded && (
            <div>
              <div className="text-sidebar-foreground/60 text-xs uppercase tracking-widest leading-none mb-0.5">Admin</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600 }}>
                ECC
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="w-7 h-7 rounded flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-white/10 transition-colors flex-shrink-0"
            title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              title={!sidebarExpanded ? label : undefined}
              className={`w-full flex items-center gap-2.5 rounded text-sm transition-colors text-left ${
                sidebarExpanded ? "px-3 py-2" : "px-0 py-2 justify-center"
              } ${
                section === id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarExpanded && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Back to public website */}
        <div className="px-2 py-2 border-t border-sidebar-border">
          <button
            onClick={() => onNavigate("home")}
            title={!sidebarExpanded ? "Back to Website" : undefined}
            className={`w-full flex items-center gap-2.5 rounded text-sm transition-colors text-left text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/5 ${
              sidebarExpanded ? "px-3 py-2" : "px-0 py-2 justify-center"
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {sidebarExpanded && <span className="truncate">Back to Website</span>}
          </button>
        </div>

        {sidebarExpanded && (
          <div className="px-5 py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/40 truncate">
            Super Admin · Rev. 1.4
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
          <h1 className="font-medium" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            {sidebarItems.find((i) => i.id === section)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
            </button>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
              DS
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* OVERVIEW */}
          {section === "overview" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600 }} className="leading-none mb-1">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-xs text-accent mt-1">{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Attendance Trend (2026)</h3>
                    <span className="text-xs text-muted-foreground">Sunday services</span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={attendanceData}>
                      <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[130, 260]} />
                      <Tooltip contentStyle={{ fontSize: 12, border: "1px solid var(--border)", borderRadius: 4 }} cursor={{ stroke: "var(--border)" }} />
                      <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Giving Summary (PHP)</h3>
                    <span className="text-xs text-muted-foreground">2026 YTD</span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={givingData} barSize={12}>
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ fontSize: 12, border: "1px solid var(--border)", borderRadius: 4 }} formatter={(v: number) => `₱ ${v.toLocaleString()}`} />
                      <Bar dataKey="tithe" fill="var(--primary)" radius={[2, 2, 0, 0]} name="Tithe" />
                      <Bar dataKey="offering" fill="var(--accent)" radius={[2, 2, 0, 0]} name="Offering" />
                      <Bar dataKey="building" fill="#4a7a9b" radius={[2, 2, 0, 0]} name="Building Fund" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-medium">Recent Visitor Submissions</h3>
                  <button onClick={() => setSection("visitors")} className="text-xs text-accent hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {recentVisitors.slice(0, 3).map((v, i) => (
                    <div key={i} className="px-5 py-3 flex items-center gap-4">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium flex-shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.area} · {v.date}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${v.type === "First Time" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                        {v.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        v.status === "converted" ? "bg-green-100 text-green-700" :
                        v.status === "contacted" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEMBERS */}
          {section === "members" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    type="text"
                    placeholder="Search by name, email, or ministry…"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded hover:bg-muted transition-colors">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                    <UserPlus className="w-3.5 h-3.5" /> Add Member
                  </button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground font-medium">Name</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground font-medium hidden md:table-cell">Email</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground font-medium hidden lg:table-cell">Ministry</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground font-medium">Status</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground font-medium hidden lg:table-cell">Baptised</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredMembers.map((m, i) => (
                      <tr key={i} className="hover:bg-muted/40 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium flex-shrink-0">
                              {m.name.charAt(0)}
                            </div>
                            <span className="font-medium">{m.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{m.email}</td>
                        <td className="px-5 py-3 hidden lg:table-cell">
                          <span className="text-xs bg-secondary px-2 py-0.5 rounded">{m.ministry}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{m.status}</span>
                        </td>
                        <td className="px-5 py-3 hidden lg:table-cell">
                          {m.baptised ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-amber-500" />}
                        </td>
                        <td className="px-5 py-3">
                          <button className="p-1 rounded hover:bg-muted transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-3 border-t border-border bg-secondary/30 text-xs text-muted-foreground">
                  Showing {filteredMembers.length} of {members.length} members
                </div>
              </div>
            </div>
          )}

          {/* VISITOR INBOX */}
          {section === "visitors" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{recentVisitors.filter(v => v.status === "pending").length} pending follow-ups</p>
                <button className="px-3 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors">Export CSV</button>
              </div>
              <div className="space-y-3">
                {recentVisitors.map((v, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-5 flex flex-wrap items-start gap-4 justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{v.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{v.phone} · {v.area}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Visited: {v.date}</div>
                        {v.wantsContact && (
                          <div className="flex items-center gap-1 text-xs text-accent mt-1">
                            <Bell className="w-3 h-3" /> Requested follow-up
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${v.type === "First Time" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                        {v.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        v.status === "converted" ? "bg-green-100 text-green-700" :
                        v.status === "contacted" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {v.status}
                      </span>
                      {v.status === "pending" && (
                        <button className="text-xs px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                          Convert to Member
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GIVING */}
          {section === "giving" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "May Tithe Total", value: "₱ 110,500", sub: "12 records" },
                  { label: "May Offering Total", value: "₱ 29,500", sub: "9 records" },
                  { label: "Building Fund (YTD)", value: "₱ 99,500", sub: "Goal: ₱ 250,000" },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-5">
                    <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 600 }} className="text-primary">
                      {s.value}
                    </div>
                    <div className="text-xs text-accent mt-1">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-sm font-medium mb-4">Giving by Category — PHP (2026)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={givingData} barSize={14}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ fontSize: 12, border: "1px solid var(--border)", borderRadius: 4 }} formatter={(v: number) => `₱ ${v.toLocaleString()}`} />
                    <Bar dataKey="tithe" fill="var(--primary)" radius={[2, 2, 0, 0]} name="Tithe" />
                    <Bar dataKey="offering" fill="var(--accent)" radius={[2, 2, 0, 0]} name="Offering" />
                    <Bar dataKey="building" fill="#4a7a9b" radius={[2, 2, 0, 0]} name="Building Fund" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-medium">Recent Giving Records</h3>
                  <button className="text-xs text-accent hover:underline">+ Add Record</button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Member</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Type</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Amount</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Method</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { member: "Daniel Santos", type: "Tithe", amount: "₱ 12,500", method: "GCash", date: "1 Jun 2026" },
                      { member: "Sarah Garcia", type: "Offering", amount: "₱ 1,750", method: "Cash", date: "1 Jun 2026" },
                      { member: "Mark Dela Cruz", type: "Building Fund", amount: "₱ 5,000", method: "Bank Transfer", date: "1 Jun 2026" },
                      { member: "Anonymous", type: "Offering", amount: "₱ 1,000", method: "Cash", date: "1 Jun 2026" },
                      { member: "Joseph Reyes", type: "Tithe", amount: "₱ 16,000", method: "GCash", date: "25 May 2026" },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-2.5">{r.member}</td>
                        <td className="px-5 py-2.5"><span className="text-xs bg-secondary px-2 py-0.5 rounded">{r.type}</span></td>
                        <td className="px-5 py-2.5 font-medium">{r.amount}</td>
                        <td className="px-5 py-2.5 text-muted-foreground text-xs">{r.method}</td>
                        <td className="px-5 py-2.5 text-muted-foreground text-xs">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {section === "attendance" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="text-sm font-medium mb-4">Attendance Trend — Sunday Services 2026</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={attendanceData}>
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[130, 260]} />
                    <Tooltip contentStyle={{ fontSize: 12, border: "1px solid var(--border)", borderRadius: 4 }} />
                    <Line type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2.5} dot={{ fill: "var(--accent)", r: 3 }} name="Attendance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-medium">Attendance Log</h3>
                  <button className="text-xs text-accent hover:underline">+ Log Service</button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Date</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Service Type</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Total</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">New Visitors</th>
                      <th className="text-left px-5 py-2.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">Logged By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { date: "1 Jun 2026", type: "Sunday Morning", total: 186, visitors: 5, by: "J. Reyes" },
                      { date: "1 Jun 2026", type: "Sunday Family", total: 94, visitors: 3, by: "J. Reyes" },
                      { date: "29 May 2026", type: "Wednesday Bible Study", total: 47, visitors: 1, by: "D. Santos" },
                      { date: "25 May 2026", type: "Sunday Morning", total: 189, visitors: 7, by: "J. Reyes" },
                      { date: "25 May 2026", type: "Sunday Family", total: 88, visitors: 2, by: "J. Reyes" },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-2.5 text-muted-foreground text-xs">{r.date}</td>
                        <td className="px-5 py-2.5">{r.type}</td>
                        <td className="px-5 py-2.5 font-medium">{r.total}</td>
                        <td className="px-5 py-2.5"><span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{r.visitors} new</span></td>
                        <td className="px-5 py-2.5 text-muted-foreground text-xs">{r.by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRAYER */}
          {section === "prayer" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{prayerRequests.filter(p => p.status === "Open").length} open requests</p>
                <div className="flex gap-2">
                  {["All", "Open", "Prayed For", "Archived"].map((f) => (
                    <button key={f} className="text-xs px-3 py-1 rounded border border-border hover:bg-muted transition-colors">{f}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {prayerRequests.map((p, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{p.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{p.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${p.visibility === "Public" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                          {p.visibility}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "Open" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.request}</p>
                    {p.status === "Open" && (
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs px-3 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors">Mark as Prayed For</button>
                        <button className="text-xs px-3 py-1.5 border border-border rounded hover:bg-muted transition-colors">Archive</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
