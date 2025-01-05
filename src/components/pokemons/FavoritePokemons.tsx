import type { FavoritePokemon } from "@/interfaces/favorite-pokemons";
import { createSignal, createEffect, For } from "solid-js";
import { FavoritePokemonsCard } from "./FavoritePokemonsCard";

// Obtener datos de localStorage
const getLocalStoragePokemons = (): FavoritePokemon[] => {
    try {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
        return [];
    }
};

export const FavoritePokemons = () => {
    const [pokemons, setPokemons] = createSignal<FavoritePokemon[]>([]);

    // Sincronizar con localStorage al cargar el componente
    createEffect(() => {
        const storedPokemons = getLocalStoragePokemons();
        setPokemons(storedPokemons);

        // Escuchar cambios en localStorage para actualizar el estado
        const handleStorageChange = () => {
            const updatedPokemons = getLocalStoragePokemons();
            setPokemons(updatedPokemons);
        };

        window.addEventListener("storage", handleStorageChange);

        // Limpieza del evento
        return () => window.removeEventListener("storage", handleStorageChange);
    });

    return (
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <For each={pokemons()}>
                {(pokemon) => <FavoritePokemonsCard pokemon={pokemon} />}
            </For>
        </div>
    );
};

