package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.ImageDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Image}.
 */
public interface ImageService {
    /**
     * Save a image.
     *
     * @param imageDTO the entity to save.
     * @return the persisted entity.
     */
    ImageDTO save(ImageDTO imageDTO);

    /**
     * Updates a image.
     *
     * @param imageDTO the entity to update.
     * @return the persisted entity.
     */
    ImageDTO update(ImageDTO imageDTO);

    /**
     * Partially updates a image.
     *
     * @param imageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ImageDTO> partialUpdate(ImageDTO imageDTO);

    /**
     * Get all the images.
     *
     * @return the list of entities.
     */
    List<ImageDTO> findAll();

    /**
     * Get the "id" image.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ImageDTO> findOne(Long id);

    /**
     * Delete the "id" image.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
