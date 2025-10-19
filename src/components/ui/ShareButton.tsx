"use client";

import { useState } from "react";
import { formatCO2Amount } from "@/lib/calculations/carbonFootprint";

interface ShareButtonProps {
    co2Amount: number;
    period?: "today" | "week" | "month";
    customMessage?: string;
}

export default function ShareButton({
    co2Amount,
    period = "today",
    customMessage,
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Generate shareable text
    const generateShareText = () => {
        if (customMessage) return customMessage;

        const formattedAmount = formatCO2Amount(co2Amount);

        return `I've tracked ${formattedAmount} of CO2 with Carbon Tracker! 🌱 #CarbonFootprint`;
    };

    // App URL for sharing - uses environment variable or falls back to current origin
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "https://carbon-tracker.app");

    // UTM parameters for tracking
    const utmParams = "?utm_source=social&utm_medium=share&utm_campaign=carbon_achievements";
    const shareUrl = `${appUrl}${utmParams}`;

    const shareText = generateShareText();

    // Social media share URLs
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Carbon Tracker Achievement")}&summary=${encodeURIComponent(shareText)}`,
    };

    // Handle copy to clipboard
    const handleCopyLink = async () => {
        try {
            // copy the URL with UTM parameters
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    // Check if device is mobile
    const isMobile = () => {
        if (typeof window === "undefined") return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Handle native share (mobile)
    const handleShareClick = async () => {
        // Use native share on mobile devices if available
        if (isMobile() && navigator.share) {
            try {
                await navigator.share({
                    title: "My Carbon Tracker Achievement",
                    text: shareText,
                    url: shareUrl,
                });
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error("Error sharing:", error);
                }
            }
        } else {
            // Show menu on desktop or if native share not available
            setShowMenu(!showMenu);
        }
    };

    // Open social media in new tab
    const openShareUrl = (platform: keyof typeof shareUrls) => {
        window.open(shareUrls[platform], "_blank", "noopener,noreferrer,width=600,height=600");
        setShowMenu(false);
    };

    return (
        <div className="relative">
            <button
                onClick={handleShareClick}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Share your achievement"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                <span className="font-medium">Share Achievement</span>
            </button>

            {/* Share Menu (for desktop or when native share not available) */}
            {showMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-64 z-50">
                    <div className="text-sm text-gray-600 mb-2 px-2">Share on:</div>

                    {/* Twitter/X */}
                    <button
                        onClick={() => openShareUrl("twitter")}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        <svg className="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <span className="text-gray-700 font-medium">Twitter / X</span>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={() => openShareUrl("facebook")}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-gray-700 font-medium">Facebook</span>
                    </button>

                    {/* LinkedIn */}
                    <button
                        onClick={() => openShareUrl("linkedin")}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-gray-700 font-medium">LinkedIn</span>
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-2"></div>

                    {/* Copy Link */}
                    <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                        {copied ? (
                            <>
                                <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-green-600 font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                    />
                                </svg>
                                <span className="text-gray-700 font-medium">Copy Link</span>
                            </>
                        )}
                    </button>

                    {/* Close button */}
                    <button
                        onClick={() => setShowMenu(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        aria-label="Close menu"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Click outside to close */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}