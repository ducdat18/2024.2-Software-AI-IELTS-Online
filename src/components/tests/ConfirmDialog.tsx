// components/ui/confirm-dialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  requireCheckbox?: boolean;
  checkboxLabel?: string;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  warningText = 'Are you sure you want to submit? You cannot return to the test after submission.',
  confirmText = 'Confirm submission',
  cancelText = 'Cancel',
  requireCheckbox = true,
  checkboxLabel = 'I understand and confirm submission',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-yellow-500 mb-3">{warningText}</p>
          {requireCheckbox && (
            <div className="flex items-center space-x-2">
              <Checkbox id="confirm" />
              <label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {checkboxLabel}
              </label>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-black"
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
