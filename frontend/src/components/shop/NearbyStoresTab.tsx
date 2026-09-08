import React from 'react';
import { MapPin } from 'lucide-react';

export const NearbyStoresTab: React.FC = () => {
  return (
    <div className="placeholder-tab-view">
      <div className="placeholder-icon-wrap">
        <MapPin size={32} />
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Stores Near You</h3>
      <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '280px', lineHeight: 1.4 }}>
        Enable location services to discover offline partner stores offering 1Fi credit checkout in your area.
      </p>
    </div>
  );
};
