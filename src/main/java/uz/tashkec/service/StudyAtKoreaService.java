package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.StudyAtKoreaDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.StudyAtKorea}.
 */
public interface StudyAtKoreaService {
    /**
     * Save a studyAtKorea.
     *
     * @param studyAtKoreaDTO the entity to save.
     * @return the persisted entity.
     */
    StudyAtKoreaDTO save(StudyAtKoreaDTO studyAtKoreaDTO);

    /**
     * Updates a studyAtKorea.
     *
     * @param studyAtKoreaDTO the entity to update.
     * @return the persisted entity.
     */
    StudyAtKoreaDTO update(StudyAtKoreaDTO studyAtKoreaDTO);

    /**
     * Partially updates a studyAtKorea.
     *
     * @param studyAtKoreaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudyAtKoreaDTO> partialUpdate(StudyAtKoreaDTO studyAtKoreaDTO);

    /**
     * Get all the studyAtKoreas.
     *
     * @return the list of entities.
     */
    List<StudyAtKoreaDTO> findAll();

    /**
     * Get the "id" studyAtKorea.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudyAtKoreaDTO> findOne(Long id);

    /**
     * Delete the "id" studyAtKorea.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
