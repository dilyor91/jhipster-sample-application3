package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.GreetingDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Greeting}.
 */
public interface GreetingService {
    /**
     * Save a greeting.
     *
     * @param greetingDTO the entity to save.
     * @return the persisted entity.
     */
    GreetingDTO save(GreetingDTO greetingDTO);

    /**
     * Updates a greeting.
     *
     * @param greetingDTO the entity to update.
     * @return the persisted entity.
     */
    GreetingDTO update(GreetingDTO greetingDTO);

    /**
     * Partially updates a greeting.
     *
     * @param greetingDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GreetingDTO> partialUpdate(GreetingDTO greetingDTO);

    /**
     * Get all the greetings.
     *
     * @return the list of entities.
     */
    List<GreetingDTO> findAll();

    /**
     * Get the "id" greeting.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GreetingDTO> findOne(Long id);

    /**
     * Delete the "id" greeting.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
