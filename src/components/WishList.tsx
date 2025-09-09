// src/pages/Wishlist.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios"; // ⬅️ korzystamy z Twojego instance
import '../styles/wishlist.css';

type WishlistItem = {
    wishlist_item_id: number;
    game_id: number;
    title: string;
    description: string | null;
    price: number | null;
    discount: number;
    image_path: string | null;
    genres: string[];
    tags: string[];
};

export default function Wishlist() {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get<WishlistItem[]>("/api/users/me/wishlist");
                setItems(res.data);
            } catch (e: any) {
                setError(e.message || "Błąd pobierania wishlisty");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Ładowanie wishlisty…</p>;
    if (error) return <p style={{ color: "salmon" }}>{error}</p>;

    return (
        <div className="wishlist-container">
            <h2>Moja lista życzeń</h2>
            {items.length === 0 ? (
                <p>Twoja wishlist jest pusta.</p>
            ) : (
                <div className="wishlist-grid">
                    {items.map((it) => (
                        <Link
                            to={`/games/${it.game_id}`}
                            key={it.wishlist_item_id}
                            className="wishlist-card"
                        >
                            <div className="wishlist-image">
                                {it.image_path ? (
                                    <img
                                        src={`/api/games/${it.game_id}/image`}
                                        alt={it.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="wishlist-img-placeholder">Brak obrazu</div>
                                )}
                            </div>
                            <div className="wishlist-info">
                                <h3>{it.title}</h3>
                                {typeof it.price === "number" && (
                                    <p className="price">
                                        {it.discount > 0 ? (
                                            <>
                        <span className="old">
                          {it.price.toFixed(2)} zł
                        </span>{" "}
                                                <span className="new">
                          {(it.price * (1 - it.discount / 100)).toFixed(2)} zł
                        </span>{" "}
                                                <span className="badge">-{it.discount}%</span>
                                            </>
                                        ) : (
                                            <span>{it.price.toFixed(2)} zł</span>
                                        )}
                                    </p>
                                )}
                                {it.genres?.length > 0 && (
                                    <p className="meta">🎮 {it.genres.join(", ")}</p>
                                )}
                                {it.tags?.length > 0 && (
                                    <p className="meta">🏷️ {it.tags.join(", ")}</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
