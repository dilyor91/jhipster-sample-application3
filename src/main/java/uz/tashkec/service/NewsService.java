package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.NewsDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.News}.
 */
public interface NewsService {
    /**
     * Save a news.
     *
     * @param newsDTO the entity to save.
     * @return the persisted entity.
     */
    NewsDTO save(NewsDTO newsDTO);

    /**
     * Updates a news.
     *
     * @param newsDTO the entity to update.
     * @return the persisted entity.
     */
    NewsDTO update(NewsDTO newsDTO);

    /**
     * Partially updates a news.
     *
     * @param newsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NewsDTO> partialUpdate(NewsDTO newsDTO);

    /**
     * Get all the news.
     *
     * @return the list of entities.
     */
    List<NewsDTO> findAll();

    /**
     * Get the "id" news.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NewsDTO> findOne(Long id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
