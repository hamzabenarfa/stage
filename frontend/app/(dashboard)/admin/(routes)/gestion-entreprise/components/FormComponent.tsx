import {
  addEntreprise,
  editEntrepriseById,
  getEntrepriseById,
} from "@/services/EntrepriseApi";
import { EntrepriseType } from "@/types/DataType";
import React, { useEffect, useState } from "react";

interface ModalProps {
  entreprises: [];
  setEntreprises: React.Dispatch<React.SetStateAction<EntrepriseType[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idEntreprise: string;
  setIdEntreprise: React.Dispatch<React.SetStateAction<string>>;
}

const FormComponent: React.FC<ModalProps> = ({
  entreprises,
  setEntreprises,
  setIsModalOpen,
  idEntreprise,
  setIdEntreprise,
}) => {
  const [email, setEmail] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [adresse, setAdresse] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveData();
  };

  const saveData = () => {
    if (idEntreprise) {
      editEntrepriseById(idEntreprise, nom, email, adresse).then(() => {
        const newObj: EntrepriseType = {
          id: idEntreprise,
          nom: nom,
          email: email,
          adresse: adresse,
        };

        // Utiliser la méthode map pour créer un nouveau tableau avec l'objet mis à jour
        const updatedEntreprises: EntrepriseType[] = entreprises.map(
          (entreprise) => (entreprise.id === idEntreprise ? newObj : entreprise)
        );
        // Mettre à jour l'état avec le nouveau tableau
        setEntreprises(updatedEntreprises);
        setIsModalOpen(false);
        setIdEntreprise("");
      });
    } else {
      addEntreprise(nom, email, adresse).then(() => {
        const newObj = {
          id: "6563b3ec03c9e12c4e1fc67d",
          nom: nom,
          email: email,
          adresse: adresse,
        };
        setEntreprises([...entreprises, newObj]);
        setIsModalOpen(false);
      });
    }
  };

  useEffect(() => {
    if (idEntreprise) {
      getEntrepriseById(idEntreprise).then((res: any) => {
        setEmail(res.data.email);
        setNom(res.data.nom);
        setAdresse(res.data.adresse);
      });
    }
  }, [idEntreprise]);

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="votre nom"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Adresse
        </label>
        <input
          type="text"
          id="name"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="votre adresse"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fermer
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
