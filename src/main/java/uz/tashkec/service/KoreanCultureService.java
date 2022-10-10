package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.KoreanCultureDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.KoreanCulture}.
 */
public interface KoreanCultureService {
    /**
     * Save a koreanCulture.
     *
     * @param koreanCultureDTO the entity to save.
     * @return the persisted entity.
     */
    KoreanCultureDTO save(KoreanCultureDTO koreanCultureDTO);

    /**
     * Updates a koreanCulture.
     *
     * @param koreanCultureDTO the entity to update.
     * @return the persisted entity.
     */
    KoreanCultureDTO update(KoreanCultureDTO koreanCultureDTO);

    /**
     * Partially updates a koreanCulture.
     *
     * @param koreanCultureDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<KoreanCultureDTO> partialUpdate(KoreanCultureDTO koreanCultureDTO);

    /**
     * Get all the koreanCultures.
     *
     * @return the list of entities.
     */
    List<KoreanCultureDTO> findAll();

    /**
     * Get the "id" koreanCulture.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KoreanCultureDTO> findOne(Long id);

    /**
     * Delete the "id" koreanCulture.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
