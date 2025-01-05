import type { FavoritePokemon } from "@/interfaces/favorite-pokemons";
import { createSignal, Show, type Component } from "solid-js";

interface Props {
    pokemon: FavoritePokemon;
}

export const FavoritePokemonsCard: Component<Props> = ({ pokemon }) => {
    const [isVisible, setIsVisible] = createSignal(true);
    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const deleteFavorite = () => {
        try {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as FavoritePokemon[];
            const newFavorites = favorites.filter(favorite => favorite.id !== pokemon.id);

            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setIsVisible(false);
        } catch (error) {
            console.error('Error al acceder a localStorage:', error);
        }
    };

    return (
        <Show when={isVisible()}>
            <div class="flex flex-col items-center justify-center">
                <a href={`/pokemons/${pokemon.name}`} class="text-slate-100 hover:text-slate-200 hover:underline">
                    <img
                        src={imageSrc}
                        alt={pokemon.name}
                        class="w-20 h-20 mb-2"
                        style={`view-transition-name: ${pokemon.name}-image-transition`}
                    />
                    <p class="capitalize">#{pokemon.id} {pokemon.name}</p>
                </a>
                <button class="bg-red-500 p-2 mr-2 rounded" onClick={deleteFavorite}>
                    Borrar
                </button>
            </div>
        </Show>
    );
};
