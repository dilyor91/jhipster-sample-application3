package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.BannerDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.Banner}.
 */
public interface BannerService {
    /**
     * Save a banner.
     *
     * @param bannerDTO the entity to save.
     * @return the persisted entity.
     */
    BannerDTO save(BannerDTO bannerDTO);

    /**
     * Updates a banner.
     *
     * @param bannerDTO the entity to update.
     * @return the persisted entity.
     */
    BannerDTO update(BannerDTO bannerDTO);

    /**
     * Partially updates a banner.
     *
     * @param bannerDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BannerDTO> partialUpdate(BannerDTO bannerDTO);

    /**
     * Get all the banners.
     *
     * @return the list of entities.
     */
    List<BannerDTO> findAll();

    /**
     * Get the "id" banner.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BannerDTO> findOne(Long id);

    /**
     * Delete the "id" banner.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
