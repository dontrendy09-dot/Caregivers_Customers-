import React, { useState } from 'react';
import {
  Users,
  Plus,
  Heart,
  Activity,
  AlertCircle,
  Phone,
  Edit2,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';
import { CareRecipient, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { BottomSheet } from '../common/BottomSheet';

interface CareRecipientsScreenProps {
  recipients: CareRecipient[];
  onBack: () => void;
  onAddRecipient: (recipient: CareRecipient) => void;
  onDeleteRecipient: (id: string) => void;
}

export const CareRecipientsScreen: React.FC<CareRecipientsScreenProps> = ({
  recipients,
  onBack,
  onAddRecipient,
  onDeleteRecipient,
}) => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Parent');
  const [age, setAge] = useState('78');
  const [gender, setGender] = useState('Female');
  const [careType, setCareType] = useState('Elder Care');
  const [medicalConditions, setMedicalConditions] = useState('Hypertension, Early Memory Loss');
  const [allergies, setAllergies] = useState('Penicillin');
  const [mobilityLevel, setMobilityLevel] = useState('Uses Walker');
  const [notes, setNotes] = useState('Loves morning tea in the sunroom.');

  const handleSave = () => {
    if (!name.trim()) return;

    const newRecipient: CareRecipient = {
      id: `rec-${Date.now()}`,
      name: name.trim(),
      relationship,
      age: Number(age) || 75,
      gender,
      careTypeNeeded: careType,
      medicalConditions: medicalConditions.split(',').map((s) => s.trim()).filter(Boolean),
      allergies: allergies.split(',').map((s) => s.trim()).filter(Boolean),
      mobilityLevel,
      specialNotes: notes,
      emergencyContact: {
        name: 'Eleanor Vance',
        relationship: 'Daughter',
        phone: '+1 (555) 234-5678'
      }
    };

    onAddRecipient(newRecipient);
    setIsAddSheetOpen(false);
    setName('');
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Care Recipients"
        subtitle="Manage family care profiles"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            Care details are securely shared only with booked caregivers.
          </p>
          <button
            type="button"
            onClick={() => setIsAddSheetOpen(true)}
            className="py-1.5 px-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Family</span>
          </button>
        </div>

        {/* Recipients list */}
        <div className="space-y-3">
          {recipients.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {rec.photo ? (
                    <img
                      src={rec.photo}
                      alt={rec.name}
                      className="w-11 h-11 rounded-xl object-cover border border-[#E8EEE8]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] font-bold flex items-center justify-center text-sm border border-[#E8EEE8]">
                      {rec.name[0]}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-[#1A1C1A]">{rec.name}</h3>
                      <span className="text-[10px] font-medium bg-[#F2F4F2] text-[#4E6E5D] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
                        {rec.relationship}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {rec.age} yrs • {rec.gender} • {rec.careTypeNeeded}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteRecipient(rec.id)}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Conditions & Details */}
              <div className="bg-[#F8F9F8] p-3 rounded-xl space-y-1.5 text-xs text-neutral-700 border border-[#E8EEE8]">
                <div className="flex items-start gap-1.5">
                  <Activity size={13} className="text-[#4E6E5D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1C1A]">Conditions: </span>
                    <span>{rec.medicalConditions.join(', ') || 'None noted'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <AlertCircle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1C1A]">Allergies: </span>
                    <span>{rec.allergies.join(', ') || 'No known allergies'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Heart size={13} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1C1A]">Mobility: </span>
                    <span>{rec.mobilityLevel}</span>
                  </div>
                </div>

                {rec.specialNotes && (
                  <p className="text-[11px] text-neutral-500 pt-1 border-t border-[#E8EEE8] leading-relaxed italic">
                    "{rec.specialNotes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD RECIPIENT SHEET */}
      <BottomSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        title="Add Care Recipient"
        subtitle="Create a profile for someone in your care circle"
      >
        <div className="space-y-4 pb-6 text-xs">
          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Margaret Vance"
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              >
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Self">Self</option>
                <option value="Relative">Relative</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="78"
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Medical Conditions (comma separated)</label>
            <input
              type="text"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              placeholder="e.g. Hypertension, Diabetes, Arthritis"
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Mobility Level</label>
            <select
              value={mobilityLevel}
              onChange={(e) => setMobilityLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            >
              <option value="Independent">Independent</option>
              <option value="Uses Cane">Uses Cane</option>
              <option value="Uses Walker">Uses Walker</option>
              <option value="Wheelchair Bound">Wheelchair Bound</option>
              <option value="Bedridden / Lift Required">Bedridden / Lift Required</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Personal Habits & Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Favorite foods, bedtime routine, hobbies..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer mt-2"
          >
            Save Family Member Profile
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};
