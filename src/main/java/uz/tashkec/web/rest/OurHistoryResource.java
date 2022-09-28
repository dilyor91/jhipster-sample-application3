package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.OurHistoryRepository;
import uz.tashkec.service.OurHistoryService;
import uz.tashkec.service.dto.OurHistoryDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.OurHistory}.
 */
@RestController
@RequestMapping("/api")
public class OurHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OurHistoryResource.class);

    private static final String ENTITY_NAME = "ourHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OurHistoryService ourHistoryService;

    private final OurHistoryRepository ourHistoryRepository;

    public OurHistoryResource(OurHistoryService ourHistoryService, OurHistoryRepository ourHistoryRepository) {
        this.ourHistoryService = ourHistoryService;
        this.ourHistoryRepository = ourHistoryRepository;
    }

    /**
     * {@code POST  /our-histories} : Create a new ourHistory.
     *
     * @param ourHistoryDTO the ourHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ourHistoryDTO, or with status {@code 400 (Bad Request)} if the ourHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/our-histories")
    public ResponseEntity<OurHistoryDTO> createOurHistory(@RequestBody OurHistoryDTO ourHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save OurHistory : {}", ourHistoryDTO);
        if (ourHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new ourHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OurHistoryDTO result = ourHistoryService.save(ourHistoryDTO);
        return ResponseEntity
            .created(new URI("/api/our-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /our-histories/:id} : Updates an existing ourHistory.
     *
     * @param id the id of the ourHistoryDTO to save.
     * @param ourHistoryDTO the ourHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ourHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the ourHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ourHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/our-histories/{id}")
    public ResponseEntity<OurHistoryDTO> updateOurHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OurHistoryDTO ourHistoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update OurHistory : {}, {}", id, ourHistoryDTO);
        if (ourHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ourHistoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ourHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OurHistoryDTO result = ourHistoryService.update(ourHistoryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ourHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /our-histories/:id} : Partial updates given fields of an existing ourHistory, field will ignore if it is null
     *
     * @param id the id of the ourHistoryDTO to save.
     * @param ourHistoryDTO the ourHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ourHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the ourHistoryDTO is not valid,
     * or with status {@code 404 (Not Found)} if the ourHistoryDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the ourHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/our-histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OurHistoryDTO> partialUpdateOurHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OurHistoryDTO ourHistoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update OurHistory partially : {}, {}", id, ourHistoryDTO);
        if (ourHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ourHistoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ourHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OurHistoryDTO> result = ourHistoryService.partialUpdate(ourHistoryDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ourHistoryDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /our-histories} : get all the ourHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ourHistories in body.
     */
    @GetMapping("/our-histories")
    public List<OurHistoryDTO> getAllOurHistories() {
        log.debug("REST request to get all OurHistories");
        return ourHistoryService.findAll();
    }

    /**
     * {@code GET  /our-histories/:id} : get the "id" ourHistory.
     *
     * @param id the id of the ourHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ourHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/our-histories/{id}")
    public ResponseEntity<OurHistoryDTO> getOurHistory(@PathVariable Long id) {
        log.debug("REST request to get OurHistory : {}", id);
        Optional<OurHistoryDTO> ourHistoryDTO = ourHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ourHistoryDTO);
    }

    /**
     * {@code DELETE  /our-histories/:id} : delete the "id" ourHistory.
     *
     * @param id the id of the ourHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/our-histories/{id}")
    public ResponseEntity<Void> deleteOurHistory(@PathVariable Long id) {
        log.debug("REST request to delete OurHistory : {}", id);
        ourHistoryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
