import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface DropdownItem {
    label: string;
    value: any;
    icon?: React.ReactNode;
}

interface SelectedInput {
    equal: Boolean;
    item: DropdownItem;
}

interface DropdownProps {
    items: DropdownItem[];
    onSelect: (item: SelectedInput) => void;
    placeholderValue?: any;
    className?: string;
    selectedLabel?: any;
}


const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, placeholderValue = 'Select an option', className, selectedLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
    const [placeholder, setPlaceholder] = useState<any>(placeholderValue)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [items]);

    useEffect(() => setSelectedItem(items.find(item => item.value === selectedLabel) || null), [selectedLabel])
    useEffect(() => setPlaceholder(placeholderValue), [placeholderValue])

    const handleItemClick = (item: DropdownItem) => {
        //Returns item null if the item selected is equal to previous item selected
        onSelect(item.value === selectedItem?.value ? { equal: true, item: item } : { equal: false, item: item });
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded py-1 leading-tight focus:outline-none focus:shadow-outline flex flex items-center justify-center w-full"
            >
                {typeof placeholder === 'string' ? placeholder :
                    placeholder &&
                    'prefix' in placeholder &&
                    'iconName' in placeholder && (< FontAwesomeIcon icon={placeholder as IconDefinition} />)}
                <svg className={`pl-1 fill-current h-4 w-4 transform transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </button>
            {isOpen && (
                <div className="absolute w-full bg-white rounded-md shadow-lg z-10 min-w-fit top-7">
                    <ul className="py-1 list-none">
                        {items.map((item) => (
                            <li
                                key={item.value}
                                onClick={() => handleItemClick(item)}
                                className={`flex justify-center cursor-pointer py-2 px-4 hover:bg-gray-100 ${selectedItem && selectedItem.value === item.value ? 'bg-gray-200' : ''
                                    }`}
                            >
                                {item.icon && (
                                    <span className="mr-2">{item.icon}</span>
                                )}
                                {!item.icon && item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;