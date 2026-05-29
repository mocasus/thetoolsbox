"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToastContext } from "@/providers/toast-provider";
import { Send } from "lucide-react";

export default function RequestToolPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToastContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      addToast("Please fill in all fields", "error");
      return;
    }
    setSubmitted(true);
    addToast("Tool request submitted! Thank you.", "success");
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Request a Tool</h1>
        <p className="mt-2 text-muted-foreground">
          Can&apos;t find the tool you need? Let us know and we&apos;ll consider
          building it.
        </p>

        {submitted ? (
          <Card className="mt-8 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Send className="h-5 w-5 text-green-500" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Request Submitted!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your suggestion. We review all requests and prioritize
              based on demand.
            </p>
            <Button className="mt-4" onClick={() => setSubmitted(false)}>
              Submit Another
            </Button>
          </Card>
        ) : (
          <Card className="mt-8 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Tool Name
                </label>
                <Input
                  placeholder="e.g. Color Palette Generator"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Description
                </label>
                <Textarea
                  placeholder="Describe what the tool should do, who it's for, and any specific features you'd like..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
