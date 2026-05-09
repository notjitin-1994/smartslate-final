"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Close, Send, CheckCircle } from "@mui/icons-material"
import { Box, Typography, Button, TextField, IconButton } from "@mui/material"

interface BetaRequestModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export default function BetaRequestModal({ isOpen, onClose, productName }: BetaRequestModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020C1B]/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#a7dadb]/20 bg-[#0d1b2a] p-8 shadow-2xl"
          >
            <div className="absolute right-4 top-4">
              <IconButton onClick={onClose} sx={{ color: "#a7dadb" }}>
                <Close />
              </IconButton>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10b981]/10">
                  <CheckCircle sx={{ fontSize: "3rem", color: "#10b981" }} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-[#b0c5c6]">
                  Thank you for your interest in {productName}. Our team will review your application and reach out via email.
                </p>
                <Button
                  onClick={onClose}
                  sx={{
                    mt: 6,
                    color: "#a7dadb",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Close Window
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-bold text-white">Join the {productName} Beta</h3>
                  <p className="text-[#b0c5c6]">
                    Be among the first to experience the future of content-to-blueprint automation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    required
                    sx={inputStyles}
                  />
                  <TextField
                    fullWidth
                    label="Work Email"
                    variant="outlined"
                    type="email"
                    required
                    sx={inputStyles}
                  />
                  <TextField
                    fullWidth
                    label="Organization"
                    variant="outlined"
                    required
                    sx={inputStyles}
                  />
                  <TextField
                    fullWidth
                    label="Tell us about your use case"
                    variant="outlined"
                    multiline
                    rows={3}
                    sx={inputStyles}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={!loading && <Send />}
                    sx={{
                      mt: 2,
                      py: 2,
                      bgcolor: "#4F46E5",
                      fontWeight: 800,
                      borderRadius: "12px",
                      "&:hover": { bgcolor: "#4338CA" },
                    }}
                  >
                    {loading ? "Processing..." : "Submit Application"}
                  </Button>
                  
                  <p className="text-center text-[10px] uppercase tracking-widest text-[#7a8a8b]">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "rgba(167, 218, 219, 0.2)" },
    "&:hover fieldset": { borderColor: "#a7dadb" },
    "&.Mui-focused fieldset": { borderColor: "#a7dadb" },
  },
  "& .MuiInputLabel-root": { color: "#b0c5c6" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a7dadb" },
}
