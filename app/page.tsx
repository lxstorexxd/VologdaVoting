"use client";

import { useEffect, useState } from "react";
import AccordionExample from "./components/Accordion";

interface Nomination {
  id: number;
  name: string;
  votes: number;
}

export default function Home() {
  const [nominations, setNominations] = useState<Nomination[]>([]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      console.log(response.json());
      if (response.ok) {
        const result = await response.json();
        setNominations(result);
      }
    }

    fetchData();
  }, []);

  const handleVote = (nominationId: number) => {
    fetch(`/api/users/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nominationId),
    })
      .then((response) => {
        if (response.ok) {
          const updatedNominations = nominations.map((nomination: any) => {
            return {
              ...nomination,
              contestants: nomination.contestants.map((contestant: any) => {
                if (contestant.id === nominationId) {
                  return { ...contestant, votes: contestant.votes + 1 };
                }
                return contestant;
              }),
            };
          });
          setNominations(updatedNominations);
        } else {
          console.error('Failed to vote:', response.statusText);
        }

      })
      .catch((error) => {
        console.error('Error while voting:', error);
      });
  };

  return (
    <main>
      <header>
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
      </header>
      <section>
        {nominations.map((data) => (
          <AccordionExample key={data.id} data={data} onVote={handleVote} />
        ))}
      </section>
      <footer>
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="h-12">
            <img src="/gorcom.png" alt="logo" />
          </div>
          <div className="h-12">
            <img src="/impuls.png" alt="logo" />
          </div>
        </div>
        <div className="mx-auto">
          <span className="text-white">Copyright © <a href="#">Orexxd</a></span>
        </div>
      </footer>
    </main>
  );
}
