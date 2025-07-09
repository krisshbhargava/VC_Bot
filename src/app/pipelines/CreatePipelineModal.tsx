"use client";
import { useRef, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FC, FormEvent, ChangeEvent } from "react";

interface PipelineData {
  name: string;
  arrMin: string;
  arrMax: string;
  teamMin: string;
  teamMax: string;
  locations: string[];
  tags: string[];
}

interface CreatePipelineModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: PipelineData) => void;
  existingNames: string[];
}

const forbiddenChars = /[^a-zA-Z0-9\s\-]/;
const quickTags = [
  "SaaS", "FinTech", "HealthTech", "EdTech", "E-commerce",
  "Enterprise Software", "B2B", "B2C", "Marketplace", "AI/ML",
  "Blockchain", "Mobile Apps", "Payments", "Banking", "Insurance",
  "Real Estate", "Logistics"
];

const CreatePipelineModal: FC<CreatePipelineModalProps> = ({ open, onClose, onCreate, existingNames }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [arrMin, setArrMin] = useState("");
  const [arrMax, setArrMax] = useState("");
  const [arrError, setArrError] = useState("");
  const [teamMin, setTeamMin] = useState("");
  const [teamMax, setTeamMax] = useState("");
  const [teamError, setTeamError] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const [dirty, setDirty] = useState(false);
  const modalRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (open) {
      const first = (modalRef.current as HTMLDivElement | null)?.querySelector("input,button") as HTMLElement | null;
      first?.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dirty && (name || arrMin || arrMax || teamMin || teamMax || locations.length || tags.length)) {
          if (!window.confirm("Unsaved changes?")) return;
        }
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, dirty, name, arrMin, arrMax, teamMin, teamMax, locations, tags, onClose]);

  // Validation
  function validateName(val: string): string {
    if (!val.trim()) return "Project name is required.";
    if (forbiddenChars.test(val)) return "Name contains forbidden characters.";
    if (existingNames?.includes(val.trim())) return "A pipeline with this name already exists.";
    return "";
  }
  function validateArr(min: string, max: string): string {
    if (min && max && parseInt(max.replace(/,/g, "")) < parseInt(min.replace(/,/g, ""))) return "Max must exceed Min.";
    return "";
  }
  function validateTeam(min: string, max: string): string {
    if (min && max && parseInt(max) < parseInt(min)) return "Max must exceed Min.";
    return "";
  }

  // Format numbers
  function formatNum(val: string): string {
    return val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Tag logic
  function addTag(tag: string) {
    if (!tag || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setTagInput("");
    setDirty(true);
  }
  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag));
    setDirty(true);
  }
  function toggleQuickTag(tag: string) {
    if (tags.includes(tag)) removeTag(tag);
    else addTag(tag);
  }

  // Location logic (stubbed autocomplete)
  function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
    setDirty(true);
    if (e.target.value.endsWith(",")) {
      const loc = e.target.value.slice(0, -1).trim();
      if (loc && !locations.includes(loc)) setLocations([...locations, loc]);
      setLocation("");
    }
  }
  function addLocation() {
    if (location.trim() && !locations.includes(location.trim())) {
      setLocations([...locations, location.trim()]);
      setLocation("");
      setDirty(true);
    }
  }
  function removeLocation(loc: string) {
    setLocations(locations.filter(l => l !== loc));
    setDirty(true);
  }

  // Form submit
  const canCreate =
    !validateName(name) &&
    !validateArr(arrMin, arrMax) &&
    !validateTeam(teamMin, teamMax) &&
    name.trim() &&
    (arrMin || arrMax || teamMin || teamMax || locations.length || tags.length);

  function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canCreate) return;
    setCreating(true);
    onCreate({
      name: name.trim(),
      arrMin: arrMin.replace(/,/g, ""),
      arrMax: arrMax.replace(/,/g, ""),
      teamMin,
      teamMax,
      locations,
      tags,
    });
    setCreating(false);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" aria-modal="true" role="dialog">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 relative outline-none" tabIndex={-1}>
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
          onClick={() => {
            if (dirty && (name || arrMin || arrMax || teamMin || teamMax || locations.length || tags.length)) {
              if (!window.confirm("Unsaved changes?")) return;
            }
            onClose();
          }}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create New Pipeline</h2>
        <p className="text-gray-500 mb-4">Set up a new due diligence pipeline with your research criteria and filters.</p>
        <form onSubmit={handleCreate}>
          <label className="block font-semibold text-gray-800 mb-1">Project Name *</label>
          <input
            className={`w-full mb-2 px-3 py-2 rounded-lg border text-base focus:outline-none text-gray-900 ${nameError ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., SaaS Enterprise Tools"
            value={name}
            onChange={e => { setName(e.target.value); setDirty(true); setNameError(validateName(e.target.value)); }}
            onBlur={e => setNameError(validateName(e.target.value))}
            aria-invalid={!!nameError}
            aria-required
          />
          {nameError && <div className="text-red-500 text-xs mb-2">{nameError}</div>}

          <label className="block text-gray-700 mb-1">Annual Recurring Revenue (ARR)</label>
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:gap-4">
            <input
              className="flex-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
              placeholder="Min ARR ($)"
              value={arrMin}
              onChange={e => { setArrMin(formatNum(e.target.value)); setDirty(true); setArrError(validateArr(formatNum(e.target.value), arrMax)); }}
              inputMode="numeric"
            />
            <input
              className="flex-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
              placeholder="Max ARR ($)"
              value={arrMax}
              onChange={e => { setArrMax(formatNum(e.target.value)); setDirty(true); setArrError(validateArr(arrMin, formatNum(e.target.value))); }}
              inputMode="numeric"
            />
          </div>
          {arrError && <div className="text-red-500 text-xs mb-2">{arrError}</div>}

          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Team Size (Headcount)</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
                placeholder="Min headcount"
                value={teamMin}
                onChange={e => { setTeamMin(e.target.value.replace(/\D/g, "")); setDirty(true); setTeamError(validateTeam(e.target.value.replace(/\D/g, ""), teamMax)); }}
                inputMode="numeric"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1 invisible">Max headcount</label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
                placeholder="Max headcount"
                value={teamMax}
                onChange={e => { setTeamMax(e.target.value.replace(/\D/g, "")); setDirty(true); setTeamError(validateTeam(teamMin, e.target.value.replace(/\D/g, ""))); }}
                inputMode="numeric"
              />
            </div>
          </div>
          {teamError && <div className="text-red-500 text-xs mb-2">{teamError}</div>}

          <label className="block text-gray-700 mb-1">Location</label>
          <input
            className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
            placeholder="e.g., San Francisco, New York, Global"
            value={location}
            onChange={handleLocationInput}
            onBlur={addLocation}
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {locations.map((loc, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                {loc}
                <button type="button" className="ml-1 text-gray-400 hover:text-gray-700" onClick={() => removeLocation(loc)} aria-label={`Remove ${loc}`}>&times;</button>
              </span>
            ))}
          </div>

          <label className="block text-gray-700 mb-1">Industry Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-gray-900 text-sm"
              placeholder="Add industry tag..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput.trim()); } }}
            />
            <button type="button" className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm" onClick={() => addTag(tagInput.trim())}>Add</button>
          </div>
          <div className="flex gap-2 mb-2 overflow-x-auto max-w-full pb-1">
            {tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 text-gray-900 rounded-full px-3 py-1 text-xs font-bold flex items-center">
                {tag}
                <button type="button" className="ml-1 text-gray-400 hover:text-gray-700" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>&times;</button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickTags.map((tag, i) => (
              <button
                key={i}
                type="button"
                className={`px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-1 ${tags.includes(tag) ? "font-bold bg-gray-300" : ""}`}
                onClick={() => toggleQuickTag(tag)}
              >
                + {tag}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
            <button
              type="button"
              className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
              onClick={() => {
                if (dirty && (name || arrMin || arrMax || teamMin || teamMax || locations.length || tags.length)) {
                  if (!window.confirm("Unsaved changes?")) return;
                }
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg font-semibold text-white text-sm ${canCreate ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"} transition min-w-[120px] flex items-center justify-center`}
              disabled={!canCreate || creating}
            >
              {creating ? (
                <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : null}
              {creating ? "Creating…" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePipelineModal; 