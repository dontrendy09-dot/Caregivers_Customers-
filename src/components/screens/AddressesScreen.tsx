import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Home,
  Building,
  CheckCircle2,
  Trash2,
  Lock
} from 'lucide-react';
import { CustomerAddress, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { BottomSheet } from '../common/BottomSheet';

interface AddressesScreenProps {
  addresses: CustomerAddress[];
  onBack: () => void;
  onSetDefault: (id: string) => void;
  onAddAddress: (addr: CustomerAddress) => void;
  onDeleteAddress: (id: string) => void;
}

export const AddressesScreen: React.FC<AddressesScreenProps> = ({
  addresses,
  onBack,
  onSetDefault,
  onAddAddress,
  onDeleteAddress,
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [label, setLabel] = useState('Home');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94107');
  const [landmark, setLandmark] = useState('');
  const [gateCode, setGateCode] = useState('');

  const handleSave = () => {
    if (!street.trim()) return;

    const newAddr: CustomerAddress = {
      id: `addr-${Date.now()}`,
      label,
      street: street.trim(),
      apt: apt.trim() ? `Apt ${apt.trim()}` : undefined,
      city,
      state,
      zipCode,
      landmark: landmark.trim() || undefined,
      gateCode: gateCode.trim() || undefined,
      isDefault: addresses.length === 0
    };

    onAddAddress(newAddr);
    setIsAddOpen(false);
    setStreet('');
    setApt('');
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Saved Addresses"
        subtitle="Manage care service locations"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            Select an address for upcoming care visits.
          </p>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="py-1.5 px-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Address</span>
          </button>
        </div>

        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => onSetDefault(addr.id)}
              className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                addr.isDefault
                  ? 'border-[#4E6E5D] ring-2 ring-[#4E6E5D]/20'
                  : 'border-[#E8EEE8] hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8EEE8]">
                    <MapPin size={16} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#1A1C1A]">{addr.label}</h4>
                      {addr.isDefault && (
                        <span className="text-[10px] font-semibold bg-[#F2F4F2] text-[#4E6E5D] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
                          Primary Location
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-700 mt-1 font-medium">
                      {addr.street} {addr.apt && `, ${addr.apt}`}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {addr.city}, {addr.state} {addr.zipCode}
                    </p>

                    {(addr.landmark || addr.gateCode) && (
                      <div className="mt-2 pt-2 border-t border-[#F2F4F2] flex flex-wrap gap-2 text-[11px] text-neutral-500">
                        {addr.gateCode && (
                          <span className="flex items-center gap-1 bg-[#F8F9F8] border border-[#E8EEE8] px-2 py-0.5 rounded">
                            <Lock size={10} /> Gate: {addr.gateCode}
                          </span>
                        )}
                        {addr.landmark && (
                          <span>Note: {addr.landmark}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAddress(addr.id);
                    }}
                    className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD ADDRESS BOTTOM SHEET */}
      <BottomSheet
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Address"
        subtitle="Where will care services take place?"
      >
        <div className="space-y-3.5 pb-6 text-xs">
          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Address Label</label>
            <div className="grid grid-cols-3 gap-2">
              {['Home', "Mom's Place", 'Vacation'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLabel(l)}
                  className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                    label === l
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                      : 'bg-white border-[#E8EEE8] text-neutral-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Street Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 742 Evergreen Terrace"
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">Apt / Suite / Unit</label>
              <input
                type="text"
                value={apt}
                onChange={(e) => setApt(e.target.value)}
                placeholder="Apt 4B"
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>
            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">Gate / Keybox Code</label>
              <input
                type="text"
                value={gateCode}
                onChange={(e) => setGateCode(e.target.value)}
                placeholder="#1234"
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Landmark / Parking Note</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Driveway on the left side of house"
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer mt-2"
          >
            Save Location
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};
