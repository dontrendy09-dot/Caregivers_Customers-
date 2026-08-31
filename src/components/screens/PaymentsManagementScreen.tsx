import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Download,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  RotateCcw,
  Clock,
  ArrowRight,
  FileText
} from 'lucide-react';
import { PaymentInvoice, PaymentMethod, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { BottomSheet } from '../common/BottomSheet';

interface PaymentsManagementScreenProps {
  invoices: PaymentInvoice[];
  walletBalance: number;
  onBack: () => void;
}

export const PaymentsManagementScreen: React.FC<PaymentsManagementScreenProps> = ({
  invoices,
  walletBalance,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'methods' | 'invoices' | 'refunds'>('invoices');
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm-1',
      type: 'card',
      label: 'Personal Visa',
      last4: '4242',
      expiryMonth: 8,
      expiryYear: 2028,
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'apple_pay',
      label: 'Apple Pay',
      isDefault: false
    }
  ]);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleAddCard = () => {
    if (!cardNumber) return;
    const newPm: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: 'card',
      label: 'Debit / Credit Card',
      last4: cardNumber.slice(-4) || '8832',
      expiryMonth: 12,
      expiryYear: 2029,
      brand: 'Mastercard',
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newPm]);
    setIsAddCardOpen(false);
    setCardNumber('');
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Payments & Invoices"
        subtitle="Manage billing, receipts and refunds"
        showBack={true}
        onBack={onBack}
      />

      {/* Tabs */}
      <div className="px-5 pt-3 bg-white border-b border-[#E8EEE8]">
        <div className="flex gap-2 pb-3">
          {[
            { id: 'invoices', label: 'Invoices & Receipts' },
            { id: 'methods', label: 'Payment Methods' },
            { id: 'refunds', label: 'Refunds' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#4E6E5D] text-white shadow-xs'
                  : 'bg-[#F2F4F2] text-neutral-600 hover:bg-[#E8EEE8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Wallet Banner */}
        <div className="p-4 bg-[#4E6E5D] text-white rounded-2xl shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">
              <Wallet size={18} />
            </div>
            <div>
              <span className="text-[10px] text-white/80 uppercase font-semibold">
                Available Wallet Credit
              </span>
              <div className="text-xl font-bold text-white">
                ${walletBalance.toFixed(2)}
              </div>
            </div>
          </div>
          <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">
            Escrow Active
          </span>
        </div>

        {/* TAB 1: INVOICES & RECEIPTS */}
        {activeTab === 'invoices' && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Tax Deductible Invoices
            </h3>

            {invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs hover:border-neutral-300 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#1A1C1A] font-mono">
                        {inv.invoiceNumber}
                      </h4>
                      <span className="text-[10px] font-semibold text-[#4E6E5D] bg-[#F2F4F2] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
                        Paid
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {inv.serviceName} • {inv.caregiverName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1A1C1A]">
                      ${inv.total.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">{inv.date}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F2F4F2] flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Paid with {inv.paymentMethod}</span>
                  <button
                    type="button"
                    className="text-[#4E6E5D] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PAYMENT METHODS */}
        {activeTab === 'methods' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Saved Cards & Wallets
              </h3>
              <button
                type="button"
                onClick={() => setIsAddCardOpen(true)}
                className="py-1.5 px-3 rounded-xl bg-[#4E6E5D] text-white text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#3E584A]"
              >
                <Plus size={13} />
                <span>Add Card</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F2F4F2] text-neutral-800 flex items-center justify-center border border-[#E8EEE8]">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#1A1C1A]">{pm.label}</h4>
                        {pm.isDefault && (
                          <span className="text-[10px] font-semibold bg-[#F2F4F2] text-[#4E6E5D] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
                            Default
                          </span>
                        )}
                      </div>
                      {pm.last4 && (
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          •••• {pm.last4} (Exp {pm.expiryMonth}/{pm.expiryYear})
                        </p>
                      )}
                    </div>
                  </div>
                  {pm.isDefault && <CheckCircle2 size={16} className="text-[#4E6E5D]" />}
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#F2F4F2] rounded-2xl flex items-center gap-2 text-xs text-neutral-600 border border-[#E8EEE8]">
              <ShieldCheck size={16} className="text-[#4E6E5D] shrink-0" />
              <span>All payment methods are encrypted with 256-bit bank grade security.</span>
            </div>
          </div>
        )}

        {/* TAB 3: REFUNDS */}
        {activeTab === 'refunds' && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Refund History
            </h3>
            <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1A1C1A]">Cancelled Respite Shift</span>
                <span className="font-bold text-emerald-700">+$124.00</span>
              </div>
              <p className="text-neutral-500">
                Refunded to Visa ending in 4242 • Aug 14, 2026
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium pt-1">
                <CheckCircle2 size={13} />
                <span>Completed & credited to bank</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD CARD SHEET */}
      <BottomSheet
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        title="Add Credit / Debit Card"
        subtitle="Saved securely for seamless 1-tap bookings"
      >
        <div className="space-y-3.5 pb-6 text-xs">
          <div>
            <label className="font-semibold text-[#1A1C1A] mb-1 block">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4000 1234 5678 9010"
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] font-mono focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">Expires (MM/YY)</label>
              <input
                type="text"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="08/28"
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] font-mono focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>
            <div>
              <label className="font-semibold text-[#1A1C1A] mb-1 block">CVV</label>
              <input
                type="text"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder="123"
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8EEE8] text-[#1A1C1A] font-mono focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCard}
            className="w-full py-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer mt-2"
          >
            Save Payment Method
          </button>
        </div>
      </BottomSheet>

      {/* INVOICE DETAIL MODAL */}
      {selectedInvoice && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-[#E8EEE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F4F2]">
              <div>
                <span className="text-[10px] font-semibold text-[#4E6E5D] uppercase">Official Receipt</span>
                <h3 className="text-sm font-bold text-[#1A1C1A]">{selectedInvoice.invoiceNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-xs font-semibold text-neutral-500 hover:text-[#1A1C1A] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-400">Date:</span>
                <span className="font-medium text-[#1A1C1A]">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Service:</span>
                <span className="font-medium text-[#1A1C1A]">{selectedInvoice.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Caregiver:</span>
                <span className="font-medium text-[#1A1C1A]">{selectedInvoice.caregiverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Recipient:</span>
                <span className="font-medium text-[#1A1C1A]">{selectedInvoice.recipientName}</span>
              </div>
              <div className="pt-2 border-t border-[#F2F4F2] flex justify-between font-bold text-[#1A1C1A]">
                <span>Total Amount:</span>
                <span>${selectedInvoice.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedInvoice(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download size={14} />
                <span>Download Official PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
