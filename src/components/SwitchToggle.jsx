import React, { useState } from "react";

function SwitchToggle({ onChange, onClick }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    onChange(!enabled); // Gửi trạng thái mới về Dashboard
    if (onClick) onClick(); // Gọi hàm onClick nếu nó được cung cấp
  };

  return (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${
        enabled ? "bg-gray-200" : "bg-gray-300"
      }`}
      onClick={handleToggle} // Trigger both toggle and click action
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );
}

export default SwitchToggle;
