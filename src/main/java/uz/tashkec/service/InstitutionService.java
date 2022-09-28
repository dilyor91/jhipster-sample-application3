package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.InstitutionDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Institution}.
 */
public interface InstitutionService {
    /**
     * Save a institution.
     *
     * @param institutionDTO the entity to save.
     * @return the persisted entity.
     */
    InstitutionDTO save(InstitutionDTO institutionDTO);

    /**
     * Updates a institution.
     *
     * @param institutionDTO the entity to update.
     * @return the persisted entity.
     */
    InstitutionDTO update(InstitutionDTO institutionDTO);

    /**
     * Partially updates a institution.
     *
     * @param institutionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InstitutionDTO> partialUpdate(InstitutionDTO institutionDTO);

    /**
     * Get all the institutions.
     *
     * @return the list of entities.
     */
    List<InstitutionDTO> findAll();

    /**
     * Get the "id" institution.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InstitutionDTO> findOne(Long id);

    /**
     * Delete the "id" institution.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
