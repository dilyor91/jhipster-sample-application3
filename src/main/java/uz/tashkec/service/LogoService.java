package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.LogoDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Logo}.
 */
public interface LogoService {
    /**
     * Save a logo.
     *
     * @param logoDTO the entity to save.
     * @return the persisted entity.
     */
    LogoDTO save(LogoDTO logoDTO);

    /**
     * Updates a logo.
     *
     * @param logoDTO the entity to update.
     * @return the persisted entity.
     */
    LogoDTO update(LogoDTO logoDTO);

    /**
     * Partially updates a logo.
     *
     * @param logoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LogoDTO> partialUpdate(LogoDTO logoDTO);

    /**
     * Get all the logos.
     *
     * @return the list of entities.
     */
    List<LogoDTO> findAll();

    /**
     * Get the "id" logo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LogoDTO> findOne(Long id);

    /**
     * Delete the "id" logo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
