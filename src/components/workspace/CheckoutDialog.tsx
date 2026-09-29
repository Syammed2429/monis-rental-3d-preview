"use client";

import { Currency, WorkspaceConfig } from "@/types/workspace";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CheckoutPanel } from "@/components/workspace/CheckoutPanel";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: WorkspaceConfig;
  currency: Currency;
}

export function CheckoutDialog({ open, onOpenChange, config, currency }: CheckoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden border-0 bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">Checkout Workspace Setup</DialogTitle>
        <DialogDescription className="sr-only">
          Review and reserve your Bali office setup with next-day delivery.
        </DialogDescription>
        <CheckoutPanel config={config} currency={currency} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
