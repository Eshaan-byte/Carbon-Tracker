'use client';

import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'standard';
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    variant = 'standard',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}: ConfirmDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const confirmButtonRef = useRef<HTMLButtonElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onCancel();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                onConfirm();
            } else if (e.key === 'Tab') {
                if (!dialogRef.current) return;

                const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onConfirm, onCancel]);

    useEffect(() => {
        if (isOpen) {
            confirmButtonRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isDanger = variant === 'danger';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role={isDanger ? 'alertdialog' : 'dialog'}
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onCancel}
                aria-hidden="true"
            />

            <div
                ref={dialogRef}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all"
                role="document"
            >
                <h2
                    id="dialog-title"
                    className={`text-xl font-semibold mb-3 ${isDanger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
                        }`}
                >
                    {title}
                </h2>

                <p
                    id="dialog-description"
                    className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                    {message}
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        ref={cancelButtonRef}
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg font-medium transition-colors
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-700 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
              dark:focus:ring-offset-gray-800"
                        aria-label={cancelText}
                    >
                        {cancelText}
                    </button>

                    <button
                        ref={confirmButtonRef}
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2
              dark:focus:ring-offset-gray-800
              ${isDanger
                                ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white focus:ring-red-500'
                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white focus:ring-blue-500'
                            }`}
                        aria-label={confirmText}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
