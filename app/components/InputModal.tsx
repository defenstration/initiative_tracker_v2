import { Character } from '../types/Character';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'player' | 'enemy';
  entity: Character;
  onSubmit: (entity: Character) => void;
}

export default function InputModal({isOpen, onClose, type, entity, onSubmit}: InputModalProps) {
    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit({
            ...entity,
            name: formData.get('name') as string,
            level: Number(formData.get('level')),
            initiative: Number(formData.get('initiative')),
            maxHp: Number(formData.get('maxHp')),
            hp: Number(formData.get('maxHp')), // Always set initial HP to maxHP
            isActive: formData.get('isActive') === 'true',
            type: type
        });
        onClose();
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            defaultValue={entity.name} 
                            required 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level:</label>
                        <input 
                            type="number" 
                            id="level" 
                            name="level" 
                            defaultValue={entity.level} 
                            required 
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="initiative" className="block text-sm font-medium text-gray-700">Initiative:</label>
                        <input 
                            type="number" 
                            id="initiative" 
                            name="initiative" 
                            defaultValue={entity.initiative} 
                            required 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxHp" className="block text-sm font-medium text-gray-700">Max HP:</label>
                        <div className="mt-1">
                            <input 
                                type="number" 
                                id="maxHp" 
                                name="maxHp" 
                                defaultValue={entity.maxHp} 
                                required 
                                min="1"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Initial HP will be set to Max HP
                            </p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Status:</label>
                        <select 
                            id="isActive" 
                            name="isActive" 
                            defaultValue={entity.isActive.toString()}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export function showModal(type: string) {
    const modal = document.querySelector(`.${type}-modal`) as HTMLElement;
    if (modal) {
        modal.style.display = 'block';
    }
}