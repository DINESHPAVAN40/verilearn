'use client';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  error?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  label,
  error,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary transition ${
          error ? 'ring-2 ring-red-500' : ''
        } ${className}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
