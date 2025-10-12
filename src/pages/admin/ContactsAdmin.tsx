import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  budget: string;
  message: string;
  date: string;
}

export default function ContactsAdmin() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ContactRequest[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const savedContacts = localStorage.getItem("contact-requests");
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contact-requests", JSON.stringify(updatedContacts));

    toast({
      title: "Contact supprimé",
      description: "La demande de contact a été supprimée.",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Contacts</h1>
        <p className="text-muted-foreground">Gérez les demandes de contact</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes de contact ({contacts.length})</CardTitle>
          <CardDescription>Liste de toutes les demandes de contact reçues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="text-sm">{new Date(contact.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.vehicle || "-"}</TableCell>
                    <TableCell>{contact.budget || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {contacts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucune demande de contact pour le moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
