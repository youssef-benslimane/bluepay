"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { DemoBookingModal } from "@/features/home/DemoBookingModal";

const INFO_ITEMS = [
  {
    icon: Phone,
    label: "Téléphone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: CONTACT_INFO.address,
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: CONTACT_INFO.hours,
    href: null,
  },
];

export function ContactInfo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="mb-1 text-2xl font-bold text-dark">
          Contactez notre équipe
        </h2>
        <p className="text-muted">
          Notre équipe est disponible pour répondre à toutes vos questions et
          organiser une démonstration personnalisée.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {INFO_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-medium text-dark hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium text-dark">{item.value}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Highlight box */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col gap-4">
        <div>
          <h3 className="mb-1 font-semibold text-dark">
            Vous souhaitez une démonstration ?
          </h3>
          <p className="text-sm text-muted">
            Nos experts vous présentent BluePay en 30 minutes et répondent à
            toutes vos questions sur la paie marocaine.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          className="group w-full"
          onClick={() => setModalOpen(true)}
        >
          <Calendar size={16} />
          Réserver votre démo
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <DemoBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
